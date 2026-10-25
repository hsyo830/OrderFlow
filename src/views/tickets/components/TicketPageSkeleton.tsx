// /tickets Suspense fallback (useSearchParams CSR bailout 구간).
// TicketPage의 레이아웃(배너 → 검색 영역 → 목록)과 감싸는 요소 클래스가 같아야 한다.
// TicketPage / SearchBar / TicketList의 레이아웃을 바꾸면 이 파일도 같이 맞출 것.
import Skeleton from "@/components/common/Skeleton";
import Container from "@/components/layout/Container";

import TicketListItemSkeleton from "./TicketListItemSkeleton";
import TicketsTopBanner from "./TicketsTopBanner";

// TicketList의 ITEMS_PER_PAGE와 맞춘다.
const SKELETON_COUNT = 5;

const TicketPageSkeleton = () => {
  return (
    <div aria-busy="true" className="w-full">
      <span className="sr-only">티켓 목록을 불러오는 중</span>
      <TicketsTopBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        {/* SearchBar의 감싸는 요소 + form 높이(py-4 + border + 내용: 모바일 20px / md 아이콘 36px) */}
        <div className="flex w-full justify-center">
          <Container>
            <Skeleton className="h-13.5 w-full rounded-xl md:h-17.5" />
          </Container>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <Container>
          {/* TODO: TicketPage에서 CategoryFilterList를 다시 켜면 여기에도 카테고리 영역 스켈레톤을 추가할 것 */}
          <div className="w-full">
            <div className="flex w-full flex-col gap-3">
              {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <TicketListItemSkeleton key={index} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TicketPageSkeleton;
