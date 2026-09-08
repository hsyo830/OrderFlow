import Image from "next/image";

import Badge from "@/components/common/Badge";

type ReservationData = {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  seat: string;
  price: number;
  status: string;
};

type ReservationListItemProps = {
  data: ReservationData;
};

const ReservationListItem = ({ data }: ReservationListItemProps) => {
  return (
    <button
      type="button"
      className="border-border bg-surface hover:bg-surface-2 grid w-full cursor-pointer grid-cols-[90px_minmax(0,1fr)] gap-4 rounded-xl border p-4 text-left transition-colors lg:grid-cols-[100px_minmax(0,1fr)_160px_140px_20px] lg:items-center"
    >
      <div className="relative h-28 w-[90px] overflow-hidden rounded-lg lg:h-32 lg:w-[100px]">
        <Image src={data.image} alt={data.title} fill sizes="100px" className="object-cover" />
      </div>

      <div className="min-w-0">
        <div className="mb-2">
          <Badge text={data.status} variant="soft" />
        </div>

        <h3 className="text-foreground truncate font-semibold">{data.title}</h3>

        <p className="text-subtle mt-2 text-sm">
          {data.date} {data.time}
        </p>

        <p className="text-muted mt-1 text-sm">{data.venue}</p>
      </div>

      <div className="border-border col-span-2 border-t pt-3 lg:col-span-1 lg:border-t-0 lg:border-l lg:pl-5">
        <p className="text-subtle text-xs">좌석</p>
        <p className="text-foreground mt-1 text-sm font-medium">{data.seat}</p>
      </div>

      <div className="col-span-2 lg:col-span-1">
        <p className="text-subtle text-xs">결제 금액</p>
        <p className="text-foreground mt-1 font-semibold">{data.price.toLocaleString("ko-KR")}원</p>
      </div>

      <span className="text-subtle hidden text-xl lg:block">›</span>
    </button>
  );
};

export default ReservationListItem;
