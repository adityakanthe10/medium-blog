/* eslint-disable @typescript-eslint/no-unused-vars */
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/blogscomponents/BlogCard";
import { RecentBlogs } from "../components/blogscomponents/RecentBlogsCard";
import { BlogSkeleton, RecentBlogsSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs(); // ✅ Correct destructuring

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="min-h-screen px-4 py-6">
          <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 ">
            {/* <div className="flex justify-center"> */}
            <div className="lg:col-span-4 space-y-10">
            <BlogSkeleton />
            </div>
            <RecentBlogsSkeleton />
          </div>
        </div>
        </div>
      </div>
    );
  }

  // console.log(blogs, "blogs");
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
                  subtitle={blog.meta?.subtitle}
                  content={blog.content}
                  previewImage={blog.meta?.previewimage}
                  createdAt={blog.createdAt}
                  publishedDate={blog.publishedDate}
                  meta={
                    blog.meta || { subtitle: "", previewimage: "", tags: [] }
                  } // Provide a default value for 'meta'
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
