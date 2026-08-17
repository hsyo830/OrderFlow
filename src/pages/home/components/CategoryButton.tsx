import { Category } from "@/constants/Category";
import { cn } from "@/lib/cn/utils";

type CategoryButtonProps = {
  category: Category;
  className?: string;
};

const CategoryButton = ({ category, className }: CategoryButtonProps) => {
  const { icon: Icon, title } = category;

  return (
    <div
      className={cn(
        "border-border hover:bg-brand-soft active:bg-brand-soft-hover flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border py-2 shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="border-border bg-input rounded-full border p-2">
            <Icon className="text-brand size-7" />
          </div>
          <div className="text-sm font-medium">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryButton;
