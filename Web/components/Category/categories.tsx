import React from "react";
import CategoryItem from "./category-item";
import { Category } from "@/types/globalTypes";

interface CategoriesProps {
  dataCategories: Category[] | undefined;
}
const Categories = ({ dataCategories }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-1 flex-wrap justify-center">
      {dataCategories?.map((category: Category) => (
        <CategoryItem
          key={category.documentId}
          slug={category.slug}
          id={category.documentId}
          name={category.name}
        />
      ))}
    </div>
  );
};

export default Categories;
