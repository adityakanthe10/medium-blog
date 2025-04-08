/* eslint-disable @typescript-eslint/no-unused-vars */
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/blogscomponents/BlogCard";
import { RecentBlogs } from "../components/blogscomponents/RecentBlogsCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

  // Dummy data
  const dummyBlogs = [
    {
      id: 1,
      authorName: "Aditya",
      title: "Learning React the Right Way",
      content: "React is a JavaScript library used to build user interfaces...",
      publishedDate: "April 8, 2025"
    },
    {
      id: 2,
      authorName: "Jane Doe",
      title: "Mastering CSS Grid",
      content: "CSS Grid is a powerful 2D layout system in CSS...",
      publishedDate: "April 6, 2025"
    },
  ];
  
export const Blogs = () => {
  const { loading, blogs } = useBlogs(); // ✅ Correct destructuring

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

console.log(blogs, "blogs");
  return (
    <div>
      <Appbar />
    <div className="min-h-screen px-4 py-6">
    <div className="overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 ">
        {/* Main blog section */}
        <div className="lg:col-span-4 space-y-10">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
             author={blog.author?.name}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate}
            />
          ))}
        </div>

        {/* Sidebar */}
        <RecentBlogs />
      </div>
      </div>
      </div>
    </div>
  );
};
