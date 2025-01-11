import React from "react";
import CourseCard from "./course-card";
import { Course } from "@/types/globalTypes";

interface CourseListProps {
  dataCourses: Course[] | undefined;
}

const CourseList = ({ dataCourses }: CourseListProps) => {
  if (!dataCourses || dataCourses.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground mt-10">
        Kurs bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {dataCourses.map((course: Course) => (
        <CourseCard key={course.documentId} data={course} />
      ))}
    </div>
  );
};

export default CourseList;
