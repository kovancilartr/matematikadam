"use client";

import { Suspense } from "react";
import Categories from "@/components/Category/Category";
import { useSearchParams } from "next/navigation";
import LoadingSkeleton from "@/components/Global/Skeleton/LoadingSkeleton";
import { useAuth } from "@/store/auth-context";
import ProtectedScreen from "@/components/Global/ProtectedScreen";
import CourseList from "@/components/Course/CourseList";
import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getFilteredCategoriesCourses,
} from "@/services/fetch-api";

const SearchContent = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const courseName = searchParams.get("courseName");

  // React Query ile kategorileri getir
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca taze kabul edilir
    gcTime: 1000 * 60 * 10, // 10 dakika boyunca cache'de tutulur
    refetchOnWindowFocus: false, // Pencere odaklandığında yeniden fetch yapma
    refetchOnReconnect: false, // İnternet bağlantısı tekrar geldiğinde fetch yapma
  });

  // React Query ile filtrelenmiş kursları getir
  const {
    data: filteredCoursesData,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ["filteredCourses", categoryId, courseName],
    queryFn: () =>
      getFilteredCategoriesCourses(
        categoryId || undefined,
        courseName || undefined
      ),
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca taze kabul edilir
    gcTime: 1000 * 60 * 10, // 10 dakika boyunca cache'de tutulur
    refetchOnWindowFocus: false, // Pencere odaklandığında yeniden fetch yapma
    refetchOnReconnect: false, // İnternet bağlantısı tekrar geldiğinde fetch yapma
    enabled: true, // Burada istediğim koşul gerçekleşirse bu query'i çalıştırır
  });

  // Loading durumu
  if (authLoading || isCategoriesLoading || isCoursesLoading) {
    return <LoadingSkeleton />;
  }

  // Hata yönetimi
  if (isCategoriesError || isCoursesError) {
    return <p>Verileri çekerken bir hata oluştu.</p>;
  }

  // Giriş kontrolü
  if (!isLoggedIn) {
    return <ProtectedScreen />;
  }

  return (
    <div className="p-6">
      {/* Kategoriler */}
      <Categories dataCategories={categoriesData?.data} />

      {/* Kurslar */}
      <div className="mt-6">
        <CourseList dataCourses={filteredCoursesData?.data} />
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
