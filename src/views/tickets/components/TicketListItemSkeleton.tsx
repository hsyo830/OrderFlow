import Skeleton from "@/components/common/Skeleton";

// TicketListItem의 그리드/패딩/칸 크기와 맞춘다. 텍스트 줄은 line-height만큼 높이를 차지하도록
// "my-* + h-4" 조합으로 둔다 (예: text-sm 20px = my-0.5 + h-4).
const TicketListItemSkeleton = () => (
  <div className="border-border grid grid-cols-[120px_minmax(0,1fr)] gap-x-4 gap-y-2 rounded-xl border p-4 lg:grid-cols-[205px_minmax(0,1fr)_115px_120px] lg:items-center lg:gap-5 lg:p-3">
    <Skeleton className="h-32 w-30 rounded-lg lg:h-40 lg:w-50" />

    <div className="flex min-w-0 flex-col gap-2">
      <Skeleton className="my-1 h-4 w-3/4" />
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
        <Skeleton className="my-0.5 h-4 w-40" />
        <Skeleton className="my-0.5 h-4 w-24" />
      </div>
      <Skeleton className="h-5 w-12 rounded-sm md:h-7 md:w-16" />
    </div>

    <div className="self-center lg:self-auto">
      <Skeleton className="my-1 h-4 w-24" />
    </div>

    <Skeleton className="h-9 w-full rounded-sm md:h-12 md:rounded-md" />
  </div>
);

export default TicketListItemSkeleton;
