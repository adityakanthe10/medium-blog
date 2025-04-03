import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

interface BlogCardPress {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

interface AvatarProps {
  name: string;
  size?: "small" | "big";
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardPress) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          {content.slice(0, 100) + " ...."}
        </div>
        <div className="w-full text-slate-500 font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minutes(s) read`}</div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="relative">
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600 ${
          size === "small" ? "w-6 h-6" : "w-10 h-10"
        } cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${
            size === "small" ? "text-xs" : "text-md"
          } font-extralight
        text-gray-600 dark:text-gray-300`}
        >
          {name[0].toUpperCase()}
        </span>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 border z-10">
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
            onClick={handleLogout}
          >
            <IoIosLogOut className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
