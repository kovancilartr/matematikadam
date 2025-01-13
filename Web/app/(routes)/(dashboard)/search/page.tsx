"use client";
import { Suspense } from "react";
import Categories from "@/components/Category/Category";
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
import CourseList from "@/components/Course/CourseList";

const SearchContent = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);
  const [dataFilteredCategoriesCourses, setDataFilteredCategoriesCourses] =
    useState<Course[]>();
  const [dataCategories, setDataCategories] = useState<Category[]>();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const courseName = searchParams.get("courseName");

  useEffect(() => {
    const response = async () => {
      setDataLoading(true);
      const dataFilteredCategoriesCoursesResponse =
        await getFilteredCategoriesCourses(
          categoryId || undefined,
          courseName || undefined
        );
      const dataCategoriesResponse = await getCategories();

      setDataFilteredCategoriesCourses(
        dataFilteredCategoriesCoursesResponse?.data
      );
      setDataCategories(dataCategoriesResponse?.data);
      setDataLoading(false);
    };
    response();
  }, [categoryId, courseName]);

  if (authLoading || dataLoading) {
    return <LoadingSkeleton />;
  }

  if (!isLoggedIn) {
    return <ProtectedScreen />;
  }

  return (
    <div className="p-6">
      <Categories dataCategories={dataCategories} />
      <div className="mt-6">
        <CourseList dataCourses={dataFilteredCategoriesCourses} />
      </div>
    </div>
  );
};

const BrowseDetailsPage = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchContent />
    </Suspense>
  );
};

export default BrowseDetailsPage;
