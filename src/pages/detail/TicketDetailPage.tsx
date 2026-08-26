"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Container from "@/components/layout/Container";
import { fetchTicketDetail } from "@/services/ticketService";

import TicketDetailSection from "./components/ticketDetailSection/TicketDetailSection";
import TicketDetailTopBanner from "./components/TicketDetailTopBanner";

const TicketDetailPage = () => {
  const params = useParams();
  const ticketId = Number(params?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => fetchTicketDetail(ticketId),
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>티켓을 불러오지 못했습니다.</div>;
  return (
    <div>
      <TicketDetailTopBanner data={data} />
      <div className="mt-10 flex justify-center">
        <Container>
          <TicketDetailSection data={data} />
        </Container>
      </div>
    </div>
  );
};

export default TicketDetailPage;
