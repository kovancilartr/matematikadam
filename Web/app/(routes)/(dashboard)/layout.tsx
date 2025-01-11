import React from "react";
import Header from "@/components/Global/Header";
import Sidebar from "@/components/Global/Sidebar";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: RoutesLayoutProps) => {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto lg:max-h-screen">
        <Header />
        <div className="w-full mx-auto px-5 py-2">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
