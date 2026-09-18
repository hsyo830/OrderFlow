export type PageItem = number | "ellipsis";

const SIBLING_COUNT = 1;

export const getPageNumbers = (currentPage: number, totalPages: number): PageItem[] => {
  const totalVisible = SIBLING_COUNT * 2 + 5;

  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - SIBLING_COUNT, 1);
  const rightSibling = Math.min(currentPage + SIBLING_COUNT, totalPages);

  const shouldShowLeftEllipsis = leftSibling > 2;
  const shouldShowRightEllipsis = rightSibling < totalPages - 1;

  const edgeRangeLength = 3 + SIBLING_COUNT * 2;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftRange = Array.from({ length: edgeRangeLength }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightRange = Array.from(
      { length: edgeRangeLength },
      (_, i) => totalPages - edgeRangeLength + i + 1,
    );
    return [1, "ellipsis", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
};
