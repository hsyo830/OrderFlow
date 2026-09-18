"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import SearchIcon from "@/components/icons/SearchIcon";
import { fetchTickets } from "@/services/ticketService";

import Pagination from "./Pagination";
import TicketListItem from "./TicketListItem";

const ITEMS_PER_PAGE = 5;

interface TicketListProps {
  searchQuery?: string;
  page: number;
  onPageChange: (page: number) => void;
}

const TicketList = ({ searchQuery = "", page, onPageChange }: TicketListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetchTickets(),
  });

  const keyword = searchQuery.trim();
  const filteredData = keyword
    ? data?.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()))
    : data;

  const totalPages = Math.max(Math.ceil((filteredData?.length ?? 0) / ITEMS_PER_PAGE), 1);
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    if (!isLoading && !error && page !== currentPage) {
      onPageChange(currentPage);
    }
  }, [isLoading, error, page, currentPage, onPageChange]);

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>티켓을 불러오지 못했습니다.</div>;

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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedData = filteredData?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3">
        {pagedData?.map((item) => (
          <TicketListItem key={item.id} data={item} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default TicketList;
