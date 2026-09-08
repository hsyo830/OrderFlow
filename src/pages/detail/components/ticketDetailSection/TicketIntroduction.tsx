import { TicketDetail } from "@/types/ticket";

type TicketIntroductionProps = {
  data: TicketDetail;
};

const TicketIntroduction = ({ data }: TicketIntroductionProps) => {
  return (
    <div className="border-border flex flex-col gap-3 rounded-lg border p-6">
      <h3 className="text-lg font-bold">공연 소개</h3>
      <div className="text-muted-foreground text-sm">{data.description}</div>
    </div>
  );
};

export default TicketIntroduction;
