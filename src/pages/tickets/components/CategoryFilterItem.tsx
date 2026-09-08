import { ReactNode } from "react";

type CategoryFilterItemProps = {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
};
const CategoryFilterItem = ({ children, isSelected, onClick }: CategoryFilterItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`border-subtle hover:text-inverse active:bg-primary-active hover:bg-primary min-w-19 cursor-pointer rounded-full border px-2 py-2 text-sm font-medium md:min-w-25 md:px-4 md:py-2.5 ${isSelected ? "bg-primary border-primary text-inverse" : ""}`}
    >
      {children}
    </button>
  );
};

export default CategoryFilterItem;
