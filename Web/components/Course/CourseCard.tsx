import { Category, Course } from "@/types/globalTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface CourseCardProps {
  data: Course;
}
const CourseCard = ({ data }: CourseCardProps) => {
  return (
    <>
      <Link href={`/search/details/${data.documentId}`} >
        <div className="group hover:shadow-sm transition overflow-hidden dark:border-gray-700 border rounded-lg p-3 h-full">
          {/* Card Image */}
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={data.imageUrl}
              alt="Course Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Card Content */}
          <div className="flex flex-col h-fit pt-2 justify-between">
            <div>
              {/* Card Title */}
              <div className="flex flex-row justify-between items-center mb-2">
                <div className="flex flex-row w-full justify-between items-center ">
                  <div className="text-lg md:text-base font-medium group-hover:text-myColor2-200 dark:group-hover:text-myColor2-100 transition lime-clamp-2">
                    {data.title}
                  </div>
                  <div className="flex flex-row gap-x-1">
                    {data.categories?.map((category: Category) => (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className="bg-myColor2-200 text-white dark:bg-myColor2-100 dark:text-black"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Description */}
              <div className="mb-4">
                <p className="line-clamp-3">{data.description}</p>
              </div>

              {/* Card Price or Purchase Button */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCard;
