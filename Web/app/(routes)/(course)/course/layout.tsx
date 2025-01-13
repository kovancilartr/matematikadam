"use client";
import ChapterNavbar from "@/components/Chapter/ChapterNavbar";
import ChapterSidebar from "@/components/Chapter/ChapterSidebar";
import { useParams } from "next/navigation";
import React from "react";

interface ChapterLayoutProps {
  children: React.ReactNode;
}
const ChapterLayout = ({ children }: ChapterLayoutProps) => {
  const courseId = useParams().courseId as string;
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-x-0 w-full z-50">
        <ChapterNavbar courseId={courseId} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-49">
        <ChapterSidebar courseId={courseId} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default ChapterLayout;
