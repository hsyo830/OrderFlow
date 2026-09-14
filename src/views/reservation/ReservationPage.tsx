"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Container from "@/components/layout/Container";
import { fetchTicketDetail } from "@/services/ticketService";

import ReservationContent from "./components/ReservationContent";
import ReservationSteps from "./components/ReservationSteps";

const ReservationPage = () => {
  const params = useParams();
  const ticketId = Number(params?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => fetchTicketDetail(ticketId),
    enabled: Number.isFinite(ticketId),
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (error || !data) return <div>티켓을 불러오지 못했습니다.</div>;

  return (
    <main className="flex justify-center py-6 md:py-10">
      <Container>
        <ReservationSteps currentStep={1} />
        <ReservationContent data={data} />
      </Container>
    </main>
  );
};

export default ReservationPage;
