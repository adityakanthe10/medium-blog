import "./TextEditor.css";
import { Editor } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { X } from "lucide-react";
import { Toast } from "primereact/toast"; // Importing Toast component from PrimeReact

// Utility function for styling editor toolbar buttons
const getBtnClass = (isActive: boolean) =>
  `px-3 py-1 rounded border border-gray-300 transition ${
    isActive ? "bg-blue-100 border-blue-400" : "bg-white hover:bg-gray-200"
  }`;

// Main BlogEditor component
export default function BlogEditor({
  onChange,
}: {
  onChange: (data: { title: string; content: string }) => void;
}) {
  const navigate = useNavigate();

  // State for blog title, content, and modal visibility
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploadingPreviewImage, setIsUploadingPreviewImage] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const toastRef = useRef<Toast>(null);

  // Handles the blog publishing request to the backend
  const handlePublish = async () => {
    setIsPublishing(true); // Show loader
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/blog`,
        {
          title,
          content: description,
          subtitle: subtitle || " ",
          previewImage: previewImage || " ",
          tags: [], // Add tags if needed
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      // Show success message
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: `${response.data.msg}`,
        life: 3000, // Toast message will disappear after 3 seconds
      });

      // Navigate to the blogs page after success
      setTimeout(() => {
        navigate(`/blogs`); // Navigate to blogs page after 2 seconds
      }, 2000);
    } catch (err) {
      console.error("Error publishing:", err);
    } finally {
      setIsPublishing(false); // Hide loader
    }
  };

  // Editor for blog title
  const titleEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1] }),
    ],
    editorProps: {
      attributes: {
        class:
          "text-4xl font-bold outline-none border-none mb-4 placeholder-transparent",
      },
    },
    onUpdate: ({ editor }) => {
      handleUpdate(editor, contentEditor);
    },
  });

  // Editor for blog content
  const contentEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      CodeBlock,
      HorizontalRule,
      TaskList,
      Paragraph,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({
        placeholder: "Write your content here...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-2 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleUpdate(titleEditor, editor);
    },
  });

  // Sends updated title/content to parent
  const handleUpdate = (
    titleEditor: Editor | null,
    contentEditor: Editor | null
  ) => {
    if (titleEditor && contentEditor) {
      const newTitle = titleEditor.getText().trim();
      const newContent = contentEditor.getHTML();

      setTitle(newTitle); // update title state
      setDescription(newContent); // update description state

      onChange({ title: newTitle, content: newContent }); // notify parent if needed
    }
  };

  // Handles uploading an image to Cloudinary and inserting it into the editor
  const handleImageInsert = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
  
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
  
      // const previewUrl = URL.createObjectURL(file);
      const userConfirmed = await showImagePreviewDialog( file.name);
      if (!userConfirmed) return;
  
      // Insert placeholder loader with unique alt
      const loaderId = `loader-${Date.now()}`;
      const loaderSrc = "https://miro.medium.com/v2/resize:fit:860/1*DCTub2EQMZIZtP5Y0hm0wQ.gif";
  
      contentEditor
        ?.chain()
        .focus()
        .setImage({ src: loaderSrc, alt: loaderId })
        .run();
  
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "blog_editor_unsigned");
  
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dr7nw3u0l/image/upload", {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();
        const imageUrl = data.secure_url;
  
        // Replace the image with loaderId using Tiptap's transaction
        contentEditor?.commands.command(({ tr, state }) => {
          const { doc } = state;
          let found = false;
  
          doc.descendants((node, pos) => {
            if (node.type.name === "image" && node.attrs.alt === loaderId) {
              tr.replaceWith(
                pos,
                pos + node.nodeSize,
                state.schema.nodes.image.create({ src: imageUrl, alt: file.name })
              );
              found = true;
              return false; // stop traversal
            }
            return true;
          });
  
          return found;
        });
      } catch (err) {
        console.error("Upload failed", err);
        alert("Upload failed. Try again.");
      }
    };
  
    fileInput.click();
  };
  

  const handlePreviewImageUpload = async () => {
    setIsUploadingPreviewImage(true); // Show modal loader
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "blog_editor_unsigned");

      setIsUploadingPreviewImage(true); // Show modal loader

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dr7nw3u0l/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        const imageUrl = data.secure_url;

        setPreviewImage(imageUrl); // ✅ This is the preview image for modal
      } catch (err) {
        console.error("Preview image upload failed", err);
        alert("Preview image upload failed. Try again.");
      } finally {
        setIsUploadingPreviewImage(false);
      }
    };

    fileInput.click();
  };

  // Shows a confirmation before inserting selected image
  const showImagePreviewDialog = (
    // fileName: string,
    name: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const dialog = window.confirm(
        `Are you sure you want to insert this image? ${name}`
      );
      resolve(dialog);
    });
  };

  // Wait until both editors are initialized
  if (!titleEditor || !contentEditor) return null;

  const editor = contentEditor;

  return (
    <div className="space-y-4">
      <Toast ref={toastRef} position="bottom-right" style={{ zIndex: 9999 }} />

      {/* Blog Title Editor */}
      <div className="relative">
        <EditorContent editor={titleEditor} />
        {titleEditor.isEmpty && (
          <div className="absolute top-0 left-0 text-gray-400 text-4xl font-semibold pointer-events-none">
            Title
          </div>
        )}
      </div>

      {/* Editor Toolbar */}
      <div className="flex gap-2 flex-wrap bg-gray-100 p-2 rounded-md">
        <button
          className={getBtnClass(editor.isActive("paragraph"))}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </button>
        <button
          className={getBtnClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          className={getBtnClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            className={getBtnClass(editor.isActive("heading", { level }))}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 })
                .run()
            }
          >
            H{level}
          </button>
        ))}
        <button
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          hr
        </button>
        <button
          className={getBtnClass(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </button>
        <button
          className={getBtnClass(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </button>
        <button
          className={getBtnClass(editor.isActive("taskList"))}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          Task List
        </button>
        <button
          className={getBtnClass(editor.isActive("codeBlock"))}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </button>
        <button
          className={getBtnClass(editor.isActive("blockquote"))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Block Quote
        </button>
        <button
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          className={getBtnClass(false)}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </button>
        <button className={getBtnClass(false)} onClick={handleImageInsert}>
          Insert Image
        </button>
      </div>

      {/* Blog Content Editor */}
      <EditorContent editor={contentEditor} className="tiptap-editor" />

      {/* Publish Button and Modal */}
      <div>
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-blue-200"
        >
          Publish
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-screen w-full p-8 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column - Story Preview */}
                <div className="w-full p-11 mt-10">
                  <h3 className="text-lg font-semibold mb-2">Story Preview</h3>
                  <div className="border border-gray-300 p-4 rounded-md">
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-sm text-gray-400 mb-4 overflow-hidden rounded-md relative">
                      {isUploadingPreviewImage ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
                          <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <span className="p-2 text-center">
                          Include a high-quality image in your story to make it
                          more inviting to readers.
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handlePreviewImageUpload}
                      className="mb-4 px-4 py-2 text-sm font-medium text-black border border-gray-400 rounded-md hover:bg-gray-100 transition"
                    >
                      Upload Preview Image
                    </button>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-3xl font-bold mb-6 border-b border-gray-300 focus:outline-none focus:border-gray-400"
                      placeholder="Enter blog title"
                    />
                    <input
                      value={subtitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      type="text"
                      className="w-full text-md font-semibold mb-6 border-b border-gray-300 focus:outline-none focus:border-gray-400"
                      placeholder="Write a preview subtitle..."
                    />
                    <p className="text-xs mt-2 text-gray-400">
                      <strong>Note:</strong> Changes here will affect how your
                      story appears in public places like homepages and inboxes
                      — not the story content itself.
                    </p>
                  </div>
                  <br />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        if (!isPublishing) {
                          // setShowModal(false);
                          handlePublish();
                        }
                      }}
                      disabled={isPublishing}
                      className={`w-full sm:w-auto px-3 py-1 rounded-full text-white transition ${
                        isPublishing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {isPublishing ? "Publishing..." : "Publish now"}
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={() => setShowModal(false)}
                      type="button"
                      className=" w-full sm:w-auto px-3 py-1 bg-gray-400 black rounded-full hover:bg-gray-600"
                    >
                      Back To Blog
                    </button>
                  </div>
                </div>

                {/* Right Column - Publishing Options */}
                {/* <div className="w-full md:w-1/2"> */}
                {/* <h3 className="text-lg font-semibold mb-2">Publishing to: <span className="font-bold">Username</span></h3> */}
                {/* Tag part */}
                {/* <label className="text-sm mb-1 block">Add a topic</label>
                  <input
                    type="text"
                    placeholder="Add a topic..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  /> */}
                {/* <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        handlePublish();
                      }}
                      className="w-full sm:w-auto px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700"
                    >
                      Publish now
                    </button>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
