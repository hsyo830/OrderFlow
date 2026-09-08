import Link from "next/link";

import { categories } from "@/constants/Category";

import CategoryButton from "./CategoryButton";

// 모바일에서 보여줄 카테고리 id
const MOBILE_VISIBLE_IDS = new Set(["concert", "lecture", "musical", "etc"]);

const CategoryList = () => {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <h3 className="subtitle">카테고리</h3>
        <Link href="/tickets">
          <div className="link-button">전체보기 &gt;</div>
        </Link>
      </div>
      <div className="flex gap-1">
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            className={MOBILE_VISIBLE_IDS.has(category.id) ? "" : "hidden md:flex"}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
