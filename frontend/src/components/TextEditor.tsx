import "./TextEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { Editor } from "@tiptap/core";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Paragraph from "@tiptap/extension-paragraph";


// BlogEditor is a rich text editor with separate title and content sections
// It provides a toolbar with formatting options and supports image upload
export default function BlogEditor({ onChange }: { onChange: (data: { title: string; content: string }) => void }) {
    // Removed unused isUploading state

   

  // Initialize the title editor with support only for H1 headings
  const titleEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }), // Disable default heading extension to avoid conflicts
      Heading.configure({ levels: [1] }), // Restrict to only H1 heading
    ],
    editorProps: {
      attributes: {
        class: "text-4xl font-bold outline-none border-none mb-4 placeholder-transparent", // Large bold title styling
      },
    },
    onUpdate: ({ editor }) => {
      handleUpdate(editor, contentEditor); // Trigger update handler on change
    },
  });

  // Initialize the content editor with rich formatting and placeholder support
  const contentEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }), // Disable default heading to avoid redundancy
      Heading.configure({ levels: [1, 2, 3] }), // Allow H1, H2, and H3 headings
      Image,
      CodeBlock,
      HorizontalRule,
      TaskList,
      Paragraph,
      TaskItem.configure({ nested: true }), // Enable nested task lists
      Placeholder.configure({
        placeholder: "Write your content here...", // Custom placeholder text
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-4 border rounded-md outline-none", // Basic content editor styling
      },
    },
    onUpdate: ({ editor }) => {
      handleUpdate(titleEditor, editor); // Trigger update handler on change
    },
  });

  // Updates the parent component with the latest title and content values
  const handleUpdate = (titleEditor: Editor | null, contentEditor: Editor | null) => {
    if (titleEditor && contentEditor) {
      const data = {
        title: titleEditor.getText().trim(), // Extract raw text for the title
        content: contentEditor.getHTML(),    // Get HTML for the content
      };
      onChange(data); // Send updated data to parent
    }
  };

  // Handles the image selection and upload to Cloudinary, then inserts the image in editor
  const handleImageInsert = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
  
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
  
      const previewUrl = URL.createObjectURL(file);
      const userConfirmed = await showImagePreviewDialog(previewUrl, file.name);
  
      if (!userConfirmed) return;

      // Step 1: Insert a placeholder loader image
      const loaderId = `loading-${Date.now()}`;
      const loaderSrc =
        "https://miro.medium.com/v2/resize:fit:860/1*DCTub2EQMZIZtP5Y0hm0wQ.gif"; // you can use your own spinner image
      contentEditor
        ?.chain()
        .focus()
        .setImage({ src: loaderSrc, alt: loaderId }) // alt used as an identifier
        .run();
  
      // Step 2: Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "blog_editor_unsigned");
  
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
  
        // Step 3: Replace loader with uploaded image
        const html = contentEditor?.getHTML();
        const replacedHtml = html?.replace(loaderSrc, imageUrl); // swap loader with real image
        const imageWithFilename = `${replacedHtml || ""} <p class="image-filename">${file.name}</p>`; // Add file name below the image
        contentEditor?.commands.setContent(imageWithFilename || "", false);
      } catch (err) {
        console.error("Upload failed", err);
        alert("Upload failed. Try again.");
      }
    };
  
    fileInput.click();
  };
  

  // Show a native browser confirm dialog with the image preview
  const showImagePreviewDialog = (fileName: string, name: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const dialog = window.confirm(
        `Are you sure you want to insert this image? ${name}`
      );
      resolve(dialog);
    });
  };

  // Wait for both editors to be initialized before rendering
  if (!titleEditor || !contentEditor) return null;

  return (
    <div className="space-y-4">
      {/* Title Editor with fallback placeholder */}
      <div className="relative">
        <EditorContent editor={titleEditor} />
        {titleEditor.isEmpty && (
          <div className="absolute top-0 left-0 text-gray-400 text-4xl font-semibold pointer-events-none">
            Title
          </div>
        )}
      </div>

      {/* Toolbar for formatting options */}
      <div className="flex gap-2 flex-wrap bg-gray-100 p-2 rounded-md">
        {/* Basic text formatting */}
        <button onClick={() => contentEditor.chain().focus().setParagraph().run()}>Paragraph</button>
        <button onClick={() => contentEditor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => contentEditor.chain().focus().toggleItalic().run()}>Italic</button>

        {/* Headings */}
        <button onClick={() => contentEditor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => contentEditor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => contentEditor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>

        {/* Code block & horizontal rule */}
        <button onClick={() => contentEditor.chain().focus().toggleCodeBlock().run()}>Code</button>
        <button onClick={() => contentEditor.chain().focus().setHorizontalRule().run()}>HR</button>

        {/* Lists */}
        <button onClick={() => contentEditor.chain().focus().toggleBulletList().run()}>Bullet List</button>
        <button onClick={() => contentEditor.chain().focus().toggleOrderedList().run()}>Ordered List</button>

        {/* Quotes and tasks */}
        <button onClick={() => contentEditor.chain().focus().toggleBlockquote().run()}>Block Quote</button>
        <button onClick={() => contentEditor.chain().focus().toggleTaskList().run()}>Task List</button>

        {/* Undo/Redo */}
        <button onClick={() => contentEditor.chain().focus().undo().run()}>Undo</button>
        <button onClick={() => contentEditor.chain().focus().redo().run()}>Redo</button>

        {/* Image upload */}
        <button onClick={handleImageInsert}>Insert Image</button>
      </div>

      {/* Content Editor */}
      <EditorContent editor={contentEditor} className="tiptap-editor" />
      


    </div>
  );
}
