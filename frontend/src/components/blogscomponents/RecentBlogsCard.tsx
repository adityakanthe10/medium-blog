// components/RecentPosts.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import moment from "moment";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  image?: string;
  title: string;
  readTime: string;
  date: string;
}

export const RecentBlogs: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/recent`);
        // console.log(res);
        // console.log("res", res.data.recentPosts);
        setPosts(res.data.recentPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const truncateTitle = (title: string) => {
    const maxLength = 50;
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => {
          const formattedPublishedDate = moment(post.date).format("MMMM D,YY");
          return (
            <>
              {" "}
              <Link
                to={`/blog/${post.id}`}
                className="text-sm text-black hover:text-slate-700"
              >
                <li key={post.id} className="flex items-start gap-4">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <img src="https://res.cloudinary.com/dr7nw3u0l/image/upload/v1745251411/7093768168_femjhl.jpg" alt="No Image"  className="w-16 h-16 object-cover rounded"/>
                  )}
                  <div>
                    <h3 className="text-md font-bold" >
                      {truncateTitle(post.title)}
                    </h3>

                    <div className="w-full text-slate-500 font-thin pt-4 flex items-center text-xs">
                      <span className="h-1 w-1 rounded-full bg-slate-400"></span>
                      <span className="p-1">{post.readTime}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-400"></span>
                      <span className="p-1">{formattedPublishedDate}</span>
                    </div>
                  </div>
                </li>
                <br />
              </Link>
            </>
          );
        })}
      </ul>
    </div>
  );
};
