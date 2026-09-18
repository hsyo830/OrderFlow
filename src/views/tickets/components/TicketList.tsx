"use client";

import { useQuery } from "@tanstack/react-query";

import SearchIcon from "@/components/icons/SearchIcon";
import { fetchTickets } from "@/services/ticketService";

import TicketListItem from "./TicketListItem";

interface TicketListProps {
  searchQuery?: string;
}

const TicketList = ({ searchQuery = "" }: TicketListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetchTickets(),
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>티켓을 불러오지 못했습니다.</div>;

  const keyword = searchQuery.trim();
  const filteredData = keyword
    ? data?.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()))
    : data;

  if (filteredData?.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-3 py-20 text-center">
        <SearchIcon className="text-muted size-8" />
        {keyword ? (
          <p className="text-muted text-sm md:text-base">
            <span className="text-foreground font-medium">{`'${keyword}'`}</span>에 대한 검색 결과가
            없습니다
          </p>
        ) : (
          <p className="text-muted text-sm md:text-base">해당 카테고리에 티켓이 없습니다</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3">
        {filteredData?.map((item) => (
          <TicketListItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
