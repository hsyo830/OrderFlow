"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchTickets } from "@/services/ticketService";

import PopularTicketCard from "./PopularTicketCard";

const PopularTicketList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetchTickets(),
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>티켓을 불러오지 못했습니다.</div>;

  const visibleTickets = data?.slice(0, 5);

  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <h3 className="subtitle">지금 가장 인기 있는 티켓</h3>
        <Link href="/tickets">
          <div className="link-button">더보기 &gt;</div>
        </Link>
      </div>
      <div className="flex gap-3">
        {visibleTickets?.map((item, index) => (
          <div
            key={item.id}
            className={
              index < 2 ? "flex-1" : index < 4 ? "hidden flex-1 md:flex" : "hidden flex-1 xl:flex"
            }
          >
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
