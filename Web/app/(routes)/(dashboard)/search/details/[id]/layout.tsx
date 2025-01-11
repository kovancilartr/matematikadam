import React from "react";

interface DetailsLayoutProps {
  children: React.ReactNode;
}

const DetailsLayout = ({ children }: DetailsLayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default DetailsLayout;
