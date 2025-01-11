"use client";
import Categories from "@/components/Category/categories";
import CourseList from "@/components/Course/courses-list";
import { useEffect } from "react";
import {
  getCategories,
  getFilteredCategoriesCourses,
} from "@/services/fetch-api";
import { useState } from "react";
import { Category, Course } from "@/types/globalTypes";
import { useSearchParams } from "next/navigation";
import LoadingSkeleton from "@/components/Global/Skeleton/LoadingSkeleton";
import { useAuth } from "@/store/auth-context";
import ProtectedScreen from "@/components/Global/ProtectedScreen";

const BrowseDetailsPage = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);
  const [dataFilteredCategoriesCourses, setDataFilteredCategoriesCourses] =
    useState<Course[]>();
  const [dataCategories, setDataCategories] = useState<Category[]>();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  console.log("authLoading", authLoading);

  useEffect(() => {
    const response = async () => {
      setDataLoading(true);
      const dataFilteredCategoriesCoursesResponse =
        await getFilteredCategoriesCourses(categoryId || undefined);
      const dataCategoriesResponse = await getCategories();

      setDataFilteredCategoriesCourses(
        dataFilteredCategoriesCoursesResponse?.data
      );
      setDataCategories(dataCategoriesResponse?.data);
      setDataLoading(false);
    };
    response();
  }, [categoryId]);

  if (authLoading || dataLoading) {
    return <LoadingSkeleton />;
  }

  if (!isLoggedIn) {
    return <ProtectedScreen />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Categories dataCategories={dataCategories} />
      <CourseList dataCourses={dataFilteredCategoriesCourses} />
    </div>
  );
};

export default BrowseDetailsPage;
