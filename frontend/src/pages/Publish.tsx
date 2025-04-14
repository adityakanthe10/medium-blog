import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import {
  //  ChangeEvent
  // ,
   useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogEditor from "../components/TextEditor";


export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (data: { title: string; content: string }) => {
    console.log("Title:", data.title);
    console.log("Content:", data.content);
  };
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
        <BlogEditor onChange={handleChange} />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg
             hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 "
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

// function TextEditor({
// onChange,
// }: {
//   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
// }) {
//   return (
//     <form>
//       <div className="mt-2">
//         <div className="w-full mb-4">
//           <div className="flex items-center justify-between px-3 border-gray-300 border">
//             <div className="my-2 bg-white rounded-b-lg w-full">
//               <textarea
//                 onChange={onChange}
//                 id="editor"
//                 rows={8}
//                 className="focus-outline-none block w-full px-0 text-sm text-gray-800 bg-white  border-0 pl-2 "
//                 placeholder="Write an article... "
//                 required
//               ></textarea>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
