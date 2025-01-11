import React from "react";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: RoutesLayoutProps) => {
  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 overflow-auto lg:max-h-screen bg-green-500"></div>
      <div className="flex flex-1 flex-col px-6 py-12 lg:px-8 bg-red-600">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
