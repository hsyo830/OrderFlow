import { TicketDetail } from "@/types/ticket";

type SeatPriceSectionProps = {
  data: TicketDetail;
};

const SeatPriceSection = ({ data }: SeatPriceSectionProps) => {
  const vipPrice = data.ticket_grade_price.find((item) => item.grade === "VIP")?.price;

  const rPrice = data.ticket_grade_price.find((item) => item.grade === "R")?.price;

  const sPrice = data.ticket_grade_price.find((item) => item.grade === "S")?.price;

  return (
    <div className="mb-2 flex flex-col gap-3 md:col-span-2 md:mb-7">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">좌석 및 가격</h3>
        <p className="text-muted text-sm font-medium">* VAT 포함</p>
      </div>

      <div className="border-border md:divide-border flex flex-col gap-3 rounded-lg border p-6 md:flex-row md:items-center md:gap-0 md:divide-x">
        <div className="flex flex-1 flex-row items-center justify-between gap-10 md:justify-center md:gap-4 md:px-6 first:md:pl-0 last:md:pr-0">
          <div className="flex items-center gap-3">
            <div className="bg-seat-vip h-4 w-4 rounded-full" />
            <div className="font-semibold">VIP석</div>
          </div>
          <div className="text-muted-foreground font-medium">
            {vipPrice?.toLocaleString("ko-KR")}원
          </div>
        </div>

        <div className="flex flex-1 flex-row items-center justify-between gap-10 md:justify-center md:gap-4 md:px-6 first:md:pl-0 last:md:pr-0">
          <div className="flex items-center gap-3">
            <div className="bg-seat-r h-4 w-4 rounded-full" />
            <div className="font-semibold">R석</div>
          </div>
          <div className="text-muted-foreground font-medium">
            {rPrice?.toLocaleString("ko-KR")}원
          </div>
        </div>

        <div className="flex flex-1 flex-row items-center justify-between gap-10 md:justify-center md:gap-4 md:px-6 first:md:pl-0 last:md:pr-0">
          <div className="flex items-center gap-3">
            <div className="bg-seat-s h-4 w-4 rounded-full" />
            <div className="font-semibold">S석</div>
          </div>
          <div className="text-muted-foreground font-medium">
            {sPrice?.toLocaleString("ko-KR")}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPriceSection;
