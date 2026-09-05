import { TicketDetail } from "@/types/ticket";

type TicketInformationProps = {
  data: TicketDetail;
};

const TicketInformation = ({ data }: TicketInformationProps) => {
  return (
    <div className="border-border flex flex-col gap-3 rounded-lg border p-6">
      <h3 className="text-lg font-bold">공연 정보</h3>
      <ul className="text-muted-foreground flex flex-col gap-3 text-sm">
        <li className="flex items-center justify-between">
          <div className="font-medium">관람 시간</div>
          <div>{data.duration}분</div>
        </li>
        <li className="flex items-center justify-between">
          <div className="font-medium">관람 연령</div>
          <div>{data.age_limit}</div>
        </li>
        <li className="flex items-center justify-between">
          <div className="font-medium">주최/주관</div>
          <div>{data.organizer}</div>
        </li>
        <li className="flex items-center justify-between">
          <div className="font-medium">티켓 수령</div>
          <div>{data.delivery}</div>
        </li>
      </ul>
    </div>
  );
};

export default TicketInformation;
