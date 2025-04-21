export const RecentBlogs = () => {
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
          <div className="w-50 h-50 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        </div>
      <div className="flex flex-row-reverse space-x-4 mt-3">
        {/* Image skeleton - hidden on mobile */}
        <div className="flex-shrink-0 hidden sm:block">
          <div className="w-50 h-50 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        </div>
      <div className="flex flex-row-reverse space-x-4 mt-3">
        {/* Image skeleton - hidden on mobile */}
        <div className="flex-shrink-0 hidden sm:block">
          <div className="w-50 h-50 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        </div>
      </div>
    );
  };
  