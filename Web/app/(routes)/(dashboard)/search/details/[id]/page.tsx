"use client";
import CourseListSection from "@/components/Course/CourseListSection";
import LoadingCourseDetailsSkeleton from "@/components/Global/Skeleton/LoadingCourseDetailsSkeleton";
import { VideoPlayerX } from "@/components/Global/VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { getCourse, getUserAndCoursesPurchases } from "@/services/fetch-api";
import { useAuth } from "@/store/auth-context";
import { Category, Course, Purchase } from "@/types/globalTypes";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CourseDetailPage = () => {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const courseId = params.id as string;
  const [courseData, setCourseData] = useState<{
    success: boolean;
    data: Course;
  } | null>(null);
  const { currentUser } = useAuth();
  const [userPurchase, setUserPurchase] = useState<{
    success: boolean;
    data: Purchase[];
  }>();

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await getCourse(courseId);
        setCourseData(response);
        setMounted(true);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserAndCoursesPurchasesData = async () => {
      try {
        const response = await getUserAndCoursesPurchases(
          currentUser?.documentId as string,
          courseId
        );
        setUserPurchase(response);
      } catch (error) {
        console.log(error);
      }
    };
    getCourseData();
    getUserAndCoursesPurchasesData();
  }, [courseId, currentUser]);

  if (!mounted) return <LoadingCourseDetailsSkeleton />;

  console.log("COURSE DATA:", courseData);
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <VideoPlayerX
              provider="youtube"
              videoUrl={courseData?.data?.videoUrl as string}
              courseId={courseId}
              isLocked={!userPurchase?.success}
            />
          </div>
          <div className="border rounded-md p-6 bg-myColor1-400 dark:bg-gray-600 dark:border-gray-700 dark:bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] dark:from-gray-600 dark:via-gray-700 dark:to-gray-900">
            <div className="flex flex-row justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-semibold mb-2 dark:text-">
                  {courseData?.data?.title}
                </h2>
                <p className="line-clamp-2">{courseData?.data?.description}</p>
              </div>
              <div className="flex flex-row gap-x-1">
                {courseData?.data?.categories?.map((category: Category) => (
                  <Badge
                    key={category.id}
                    variant="default"
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
          <div className=" border dark:border-gray-700 rounded-md p-6 text-myColor1-400 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900">
            <div className="mb-7">
              <h4 className="font-semibold text-xl mb-4">
                Ready to start building?
              </h4>
              <p className="text-sm">
                Track your progress, watch with subtitles, change quality &
                speed, and more.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center border dark:border-gray-700 rounded-md shadow-lg">
            {/* Üst Badgeli Başlık */}
            <div className="relative w-full">
              <div className="absolute top-2 -right-4 bg-myColor2-100 text-black text-xs py-1 px-3 rounded-full transform rotate-[24deg]">
                Kurs İçerik Badgesi
              </div>
              <div className="p-4 text-myColor1-400 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900 rounded-t-md">
                <h2 className="text-xl font-semibold text-center text-white">
                  Kurs İçeriği
                </h2>
              </div>
            </div>

            {/* Kurs İçeriği */}
            <div className="p-2 w-full rounded-b-md dark:bg-slate-700">
              <CourseListSection courseData={courseData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
