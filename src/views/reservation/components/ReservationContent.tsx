import { useQuery } from "@tanstack/react-query";

import { fetchTicketSeats } from "@/services/seatService";
import { TicketDetail } from "@/types/ticket";

import SeatMap from "./SeatMap";
import SelectedSeatSummary from "./SelectedSeatSummary";
import TicketInfo from "./TicketInfo";

type ReservationContentProps = {
  data: TicketDetail;
};

const ReservationContent = ({ data }: ReservationContentProps) => {
  const {
    data: ticketSeats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ticketSeats", data.id],
    queryFn: () => fetchTicketSeats(data.id),
  });

  return (
    <div className="border-border rounded-xl border p-4 md:p-6">
      <TicketInfo data={data} />
      <div className="border-border my-5 border-t md:my-6" />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          {isLoading && (
            <div className="text-muted flex h-40 items-center justify-center text-sm">
              좌석 정보를 불러오는 중...
            </div>
          )}
          {error && (
            <div className="text-muted flex h-40 items-center justify-center text-sm">
              좌석 정보를 불러오지 못했습니다.
            </div>
          )}
          {ticketSeats && <SeatMap seats={ticketSeats} />}
        </div>
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <SelectedSeatSummary selectedSeatIds={[]} />
        </div>
      </div>
    </div>
  );
};

export default ReservationContent;
