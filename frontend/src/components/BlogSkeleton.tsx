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
    <div className="hidden lg:block w-full max-w-xs px-4">
      {/* Title skeleton */}
      <div className="h-6 w-3/5 bg-gray-200 rounded animate-pulse mb-4"></div>
      
      {/* List items skeleton */}
      <ul className="space-y-3">
        {[...Array(4)].map((_, index) => (
          <li key={index} className="flex items-center">
            {/* Bullet point skeleton */}
            <div className="h-2 w-2 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
            {/* Text skeleton - random widths for more natural look */}
            <div 
              className={`h-3 bg-gray-200 rounded animate-pulse ${
                index % 2 === 0 ? 'w-4/5' : 'w-3/5'
              }`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};