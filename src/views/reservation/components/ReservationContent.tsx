import { TicketDetail } from "@/types/ticket";

import SeatMap from "./SeatMap";
import SelectedSeatSummary from "./SelectedSeatSummary";
import TicketInfo from "./TicketInfo";

type ReservationContentProps = {
  data: TicketDetail;
};

const ReservationContent = ({ data }: ReservationContentProps) => {
  return (
    <div className="border-border rounded-xl border p-4 md:p-6">
      <TicketInfo data={data} />
      <div className="border-border my-5 border-t md:my-6" />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          <SeatMap />
        </div>
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <SelectedSeatSummary />
        </div>
      </div>
    </div>
  );
};

export default ReservationContent;
