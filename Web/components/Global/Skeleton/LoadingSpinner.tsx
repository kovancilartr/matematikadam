import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-6 h-6 border-4 border-myColor2-200 dark:border-myColor1-600 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
