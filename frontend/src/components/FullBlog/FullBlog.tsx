import { Blog } from "../../hooks";
import { Appbar } from "../Appbar";
// import { Avatar } from "../blogscomponents/BlogCard";
import "./FullBlog.css"; // Import the CSS file for styling
import DOMPurify from "dompurify";

interface AvatarProps {
  name: string;
  size?: "small" | "big";
}
export const FullBlog = ({ blog }: { blog: Blog }) => {
  const cleanHTML = DOMPurify.sanitize(blog.content);
  // console.log(cleanHTML, "cleanHTML");

  

  return (
    <div>
      <Appbar />
      <div>
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>

            {/* Blog Content */}
            <div
              className="pt-6 text-slate-700 blog-html"
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
                <br />
          </div>

          {/* Author Sidebar */}
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex">
              <div className="pr-4 flex flex-col justify-center">
                <Avatarprofile size="big" name={blog.author.name || "anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Avatarprofile({ name, size = "small" }:AvatarProps) {
  const initial = name?.[0].toUpperCase() || "A";
  return (
    <div className="relative">
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600 ${
          size === "small" ? "w-4 h-4" : "w-10 h-10"
        } cursor-pointer`}
        // onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${
            size === "small" ? "text-xs" : "text-md"
          } font-extralight text-gray-200 dark:text-gray-200`}
        >
          {initial}
        </span>
      </div>
    </div>
  );
}