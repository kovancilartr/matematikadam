import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Kategoriler için Skeleton */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="py-2 px-4 w-24 h-8 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse"
          ></div>
        ))}
      </div>

      {/* Kurs Kartları için Skeleton */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
