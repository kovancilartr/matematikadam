"use client";
import React from "react";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  slug: string;
  name: string;
  id: string;
}
const CategoryItem = ({ name, id }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("slug");

  const isSelected = currentCategoryId === id;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : id,
          slug: currentTitle,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <>
      <button
        className={cn(
          "py-2 px-3 text-sm border border-slate-200 dark:border-slate-700 rounded-full flex items-center gap-x-1 hover:border-slate-400 dark:hover:border-slate-400 transition",
          isSelected &&
            "bg-myColor2-200/80 dark:bg-myColor2-100 text-white dark:text-black"
        )}
        type="button"
        onClick={onClick}
      >
        <div className="truncate">{name}</div>
      </button>
    </>
  );
};

export default CategoryItem;
