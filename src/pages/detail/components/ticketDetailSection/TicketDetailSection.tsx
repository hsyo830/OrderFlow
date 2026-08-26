import Button from "@/components/common/Button";
import { TicketDetail } from "@/types/ticket";

import SeatPriceSection from "./SeatPriceSection";
import TicketInformation from "./TicketInformation";
import TicketIntroduction from "./TicketIntroduction";
import TicketNotice from "./TicketNotice";

type TicketDetailSectionProps = {
  data: TicketDetail;
};

const TicketDetailSection = ({ data }: TicketDetailSectionProps) => {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <TicketIntroduction data={data} />
      <TicketInformation data={data} />
      <div className="md:col-span-2">
        <TicketNotice />
      </div>
      <SeatPriceSection data={data} />
      <Button variant="primary" className="w-full py-4 md:col-span-2 md:py-4">
        예매하기
      </Button>
    </section>
  );
};

export default TicketDetailSection;
