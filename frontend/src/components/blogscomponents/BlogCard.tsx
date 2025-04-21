import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import moment from "moment";

interface BlogCardPress {
  author: string;
  title: string;
  subtitle?: string;
  content: string;
  previewImage?: string;
  publishedDate: string;
  createdAt: string;
  meta: PostMeta;
  id: number;
}
interface PostMeta {
  subtitle?: string;
  tags?: string[];
  previewImage?: string;
}

interface AvatarProps {
  name: string;
  size?: "small" | "big";
}

export const BlogCard = ({
  author,
  title,
  subtitle,
  // createdAt,
  // previewImage,
  content,
  publishedDate,
  meta,
  id,
}: BlogCardPress) => {
  const authorName = author
    ? author[0]?.charAt(0).toUpperCase() + author.slice(1)
    : "NA";
  // const contents =
  // content[0]?.charAt(0).toUpperCase() + content.slice(1, 150) + " ....";
  const capitalisedtitles = title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const formattedPublishedDate = moment(publishedDate).format("MMMM D, YYYY");
  const trimpreviewImage = meta?.previewImage?.trim();

  // console.log("previewImage", previewImage);
  // console.log("previewImage", meta?.previewImage);
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-r border-slate-200 pb-4 w-full cursor-pointer lg:pr-30">
        <div className="flex">
          <Avatar name={author} />
          <div className="flex justify-center items-center flex-col pl-2">
            <Circle />
          </div>
          <div className="font-extralight pl-2 text-xs flex justify-center item-center flex-col">
            {authorName}
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>

        {/* Use flex to layout content */}
        <div className="flex flex-row-reverse space-x-4">
          {/* Image section */}
          <div className="flex-shrink-0 hidden sm:block">
            {trimpreviewImage ? (
              <img
                src={meta.previewImage }
                alt={title}
                className="w-40 h-40 object-cover rounded-lg"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dr7nw3u0l/image/upload/v1745251411/7093768168_femjhl.jpg"
                alt="Placeholder"
                className="w-40 h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Text content section */}
          <div className="flex-1">
            <div className="text-xl font-bold pt-2">{capitalisedtitles}</div>
            <div className="text-xl font-medium pt-2 text-slate-400">
              {subtitle}
            </div>
            {/* <div className="text-md font-extralight">{contents}</div> */}
            <div className="w-full text-slate-500 font-thin pt-4 flex items-center space-x-2 text-sm">
              <span>{`${Math.ceil(content.length / 100)} min read`}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400"></span>
              <span>{formattedPublishedDate}</span>
            </div>
          </div>
        </div>
        <br />

        <div className="border-b border-slate-200"></div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-300"></div>;
}

export function Avatar({ name, size = "small" }: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const initial = name?.[0].toUpperCase() || "A";
  return (
    <div className="relative">
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600 ${
          size === "small" ? "w-4 h-4" : "w-10 h-10"
        } cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${
            size === "small" ? "text-xs" : "text-md"
          } font-extralight text-gray-200 dark:text-gray-200`}
        >
          {initial}
        </span>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-3 w-50 bg-white rounded-lg shadow-md py-2 border-b-slate-500 z-10 ">
          <button className="flex items-center px-3 py-2 text-slate-500 font-light text-sm hover:text-black w-full">
            <FiUser className="mr-2" /> Profile
          </button>
          <button className="flex items-center px-3 py-2 text-slate-500 font-light text-sm hover:text-black w-full">
            <FaRegBookmark className="mr-2" /> Bookmark
          </button>
          <hr className="border-slate-200 " />
          <button className="flex items-center px-3 py-2 text-slate-500 font-light text-sm hover:text-black w-full">
            Settings
          </button>
          <button
            className="flex items-center px-3 py-2 text-slate-500 font-light text-sm hover:text-black w-full "
            onClick={handleLogout}
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
}
