"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTickets } from "@/services/ticketService";

import TicketListItem from "./TicketListItem";

const TicketList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetchTickets(),
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>티켓을 불러오지 못했습니다.</div>;

  console.log(data);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3">
        {data?.map((item) => (
          <TicketListItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
