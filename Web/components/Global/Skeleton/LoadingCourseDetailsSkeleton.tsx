import React from "react";

const LoadingCourseDetailsSkeleton = () => {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
          <div className="rounded-xl overflow-hidden shadow-lg animate-pulse">
            <div className="bg-gray-300 w-full h-48 rounded-md"></div>{" "}
            {/* Video Player Skeleton */}
          </div>
          <div className="border rounded-md p-6 bg-myColor1-400 dark:bg-gray-600 dark:border-gray-700 dark:bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] dark:from-gray-600 dark:via-gray-700 dark:to-gray-900 animate-pulse">
            <div className="flex flex-row justify-between items-start mb-2">
              <div>
                <div className="bg-gray-300 w-2/3 h-6 rounded-md mb-2"></div>{" "}
                {/* Course Title Skeleton */}
                <div className="bg-gray-300 w-3/4 h-4 rounded-md"></div>{" "}
                {/* Course Description Skeleton */}
              </div>
              <div className="flex flex-row gap-x-1">
                {/* Category Skeleton */}
                <div className="bg-gray-300 w-16 h-6 rounded-md"></div>
                <div className="bg-gray-300 w-16 h-6 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
          <div className="border dark:border-gray-700 rounded-md p-6 text-myColor1-400 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900 animate-pulse">
            <div className="mb-7">
              <div className="bg-gray-300 w-1/3 h-6 rounded-md mb-4"></div>{" "}
              {/* Ready to start building title */}
              <div className="bg-gray-300 w-2/3 h-4 rounded-md"></div>{" "}
              {/* Text Skeleton */}
            </div>
          </div>

          <div className="flex flex-col items-center border dark:border-gray-700 rounded-md shadow-lg animate-pulse">
            {/* Top Badge Skeleton */}
            <div className="relative w-full">
              <div className="absolute top-2 -right-4 bg-myColor2-100 text-black text-xs py-1 px-3 rounded-full transform rotate-[24deg] animate-pulse w-28 h-6"></div>
              <div className="p-4 text-myColor1-400 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900 rounded-t-md">
                <div className="bg-gray-300 w-1/2 h-6 rounded-md mb-2"></div>{" "}
                {/* Kurs İçeriği Title Skeleton */}
              </div>
            </div>

            {/* Course Content Skeleton */}
            <div className="p-2 w-full rounded-b-md dark:bg-slate-700 animate-pulse">
              <div className="bg-gray-300 w-full h-6 rounded-md mb-2"></div>{" "}
              {/* Course Section Skeleton */}
              <div className="bg-gray-300 w-full h-6 rounded-md mb-2"></div>{" "}
              {/* Course Section Skeleton */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCourseDetailsSkeleton;
