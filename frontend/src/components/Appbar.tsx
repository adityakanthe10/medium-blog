import { Link } from "react-router-dom";
import { Avatar } from "./blogscomponents/BlogCard";
import { assets } from "../assets/assets";

export const Appbar = () => {
  return (
    <div className="border-slate-100 border-b flex justify-between px-10 py-2">
      <Link to={"/blogs"}>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <img src={assets.logo} className="h-10" />
        </div>
      </Link>
      <div className="flex">
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-8 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Publish
          </button>
        </Link>

        <Avatar size={"big"} name={"Easy"} />
      </div>
    </div>
  );
};
