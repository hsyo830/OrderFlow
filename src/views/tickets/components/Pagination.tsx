import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

import { getPageNumbers } from "../utils/getPageNumbers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-center gap-1" aria-label="페이지네이션">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className="text-muted hover:text-foreground disabled:text-disabled flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="size-4" />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="text-muted flex size-8 items-center justify-center text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-primary text-inverse"
                : "text-muted hover:bg-secondary-hover hover:text-foreground"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className="text-muted hover:text-foreground disabled:text-disabled flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </nav>
  );
};

export default Pagination;
