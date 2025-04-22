export const BlogSkeleton = () => {
  return (
    <div className="p-4 border-r border-slate-200 pb-4 w-full lg:pr-30">
      {/* Author section skeleton */}
      <div className="flex items-center">
        {/* Avatar skeleton */}
        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-1 w-1 rounded-full bg-gray-300 mx-2"></div>
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Content section skeleton image */}
      <div className="flex flex-row-reverse space-x-4 mt-3">
        {/* Image skeleton - hidden on mobile */}
        <div className="flex-shrink-0 hidden sm:block">
          <div className="w-40 h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Text content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Title skeleton */}
          {/* <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div> */}
          {/* Subtitle skeleton */}
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>

          {/* Content preview skeleton (3 lines) */}
          <div className="space-y-2 pt-1">
            {/* <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div> */}
            {/* <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div> */}
            {/* <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse"></div> */}
          </div>

          {/* Metadata skeleton */}
          <div className="flex items-center space-x-2 pt-3">
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="border-b border-slate-200 mt-4"></div>
    </div>
  );
};

export const RecentBlogsSkeleton = () => {
  return (
    <div className="hidden lg:block w-full  max-w-xs px-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Recent Blogs</h2>
      {/* <ul className="space-y-2 text-sm text-slate-700">
      <li></li>
      <li>How Tailwind CSS Works</li>
      <li>Top 10 Web Dev Tools in 2024</li>
      <li>Mastering Flex and Grid</li>
    </ul> */}
      {/* Content section skeleton image */}
      <div className="flex flex-row-reverse space-x-4 mt-3">
        {/* Image skeleton - hidden on mobile */}
        <div className="flex-shrink-0 hidden sm:block">
          <div className="w-50 h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-row-reverse space-x-4 mt-3">
        {/* Image skeleton - hidden on mobile */}
        <div className="flex-shrink-0 hidden sm:block">
          <div className="w-50 h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-row-reverse space-x-4 mt-3">
        {/* Image skeleton - hidden on mobile */}
        <div className="flex-shrink-0 hidden sm:block">
          <div className="w-50 h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const FullBlogLeftSkeletonLoader = () => (
  <div className="space-y-8">
    <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
    <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded-md"></div>
    <div className="w-full h-48 bg-gray-200 animate-pulse rounded-md"></div>
  </div>
);

export const FullBlogRightSkeletonLoader = () => (
  <div className="flex items-center space-x-4 ">
    <div className=" ml-2 w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
    <div className="w-24 h-6 bg-gray-200 animate-pulse rounded-md"></div>
  </div>
);
