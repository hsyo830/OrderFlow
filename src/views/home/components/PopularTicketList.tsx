"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import Skeleton from "@/components/common/Skeleton";
import { fetchTickets } from "@/services/ticketService";

import PopularTicketCard from "./PopularTicketCard";

const SKELETON_COUNT = 5;

// 실제 카드와 스켈레톤이 같은 반응형 개수(모바일 2 / md 4 / xl 5)를 쓰도록 공유한다.
const getCardSlotClassName = (index: number) =>
  index < 2 ? "flex-1" : index < 4 ? "hidden flex-1 md:flex" : "hidden flex-1 xl:flex";

const PopularTicketList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetchTickets(),
  });

  const sectionHeader = (
    <div className="flex items-center justify-between">
      <h3 className="subtitle">지금 가장 인기 있는 티켓</h3>
      <Link href="/tickets">
        <div className="link-button">더보기 &gt;</div>
      </Link>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-3.5 md:mt-10">
        {sectionHeader}
        <div aria-busy="true" className="flex gap-3">
          <span className="sr-only">인기 티켓을 불러오는 중</span>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <div key={index} className={getCardSlotClassName(index)}>
              {/* PopularTicketCard의 h-62 md:h-75 rounded-lg와 맞춘다 */}
              <Skeleton className="h-62 w-full flex-1 rounded-lg md:h-75" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div>티켓을 불러오지 못했습니다.</div>;

  const visibleTickets = data?.slice(0, 5);

  return (
    <div className="flex w-full flex-col gap-3.5 md:mt-10">
      {sectionHeader}
      <div className="flex gap-3">
        {visibleTickets?.map((item, index) => (
          <div key={item.id} className={getCardSlotClassName(index)}>
            <div key={item.id} className="flex-1">
              <Link href={`/tickets/${item.id}`}>
                <PopularTicketCard data={item} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTicketList;
