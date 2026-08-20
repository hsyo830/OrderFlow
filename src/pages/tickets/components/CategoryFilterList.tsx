"use client";

import { useState } from "react";

import { categories, TicketCategory } from "@/constants/Category";

import CategoryFilterItem from "./CategoryFilterItem";

type CategoryFilter = "all" | TicketCategory;

const CategoryFilterList = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  return (
    <div className="mb-3.5 flex scrollbar-none gap-2 overflow-x-scroll">
      <CategoryFilterItem
        isSelected={selectedCategory === "all"}
        onClick={() => setSelectedCategory("all")}
      >
        전체
      </CategoryFilterItem>

      {categories.map((category) => (
        <CategoryFilterItem
          key={category.id}
          isSelected={selectedCategory === category.id}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.title}
        </CategoryFilterItem>
      ))}
    </div>
  );
};

export default CategoryFilterList;
