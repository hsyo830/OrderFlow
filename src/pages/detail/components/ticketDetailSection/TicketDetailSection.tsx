import Button from "@/components/common/Button";

import SeatPriceSection from "./SeatPriceSection";
import TicketInformation from "./TicketInformation";
import TicketIntroduction from "./TicketIntroduction";
import TicketNotice from "./TicketNotice";

const TicketDetailSection = () => {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TicketIntroduction />
      <TicketInformation />
      <div className="mb-2 md:col-span-2 md:mb-3">
        <TicketNotice />
      </div>
      <SeatPriceSection />
      <Button variant="primary" className="w-full py-4 md:col-span-2 md:py-4">
        예매하기
      </Button>
    </section>
  );
};

export default TicketDetailSection;
