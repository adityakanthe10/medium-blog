import { useState } from "react";
import { Appbar } from "../components/Appbar";
import BlogEditor from "../components/TextEditor";

// Component to handle blog publishing
export const Publish = () => {
  const [, setBlogContent] = useState<{ title: string; content: string }>({ title: "", content: "" });

  return (
    <div>
      <Appbar /> {/* Top Navigation Bar */}
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          {/* Blog text editor component */}
          <BlogEditor
            onChange={(data) => {
              setBlogContent(data); // Update blog content state on change
            }}
          />
        </div>
      </div>
    </div>
  );
};
