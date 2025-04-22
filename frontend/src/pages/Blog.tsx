import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { FullBlogLeftSkeletonLoader, FullBlogRightSkeletonLoader } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog/FullBlog";
import { useBlog } from "../hooks";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <Appbar />
        <div>
          <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-12">
            <div className="col-span-8">
              <FullBlogLeftSkeletonLoader />
            </div>
            <div className="col-span-4">
              <FullBlogRightSkeletonLoader />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <div>Error: Blog not found</div>;
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
