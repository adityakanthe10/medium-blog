
import { Appbar } from "../components/Appbar";
import BlogEditor from "../components/TextEditor";

// Component to handle blog publishing
export const Publish = () => {
  return (
    <div>
      <Appbar /> {/* Top Navigation Bar */}
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          {/* Blog text editor component */}
          <BlogEditor
            onChange={(data) => {
              console.log("Blog data:", data);
            }}
          />
        </div>
      </div>
    </div>
  );
};
