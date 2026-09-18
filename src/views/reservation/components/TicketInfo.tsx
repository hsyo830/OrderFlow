import Image from "next/image";

import { categories } from "@/constants/Category";
import { TicketDetail } from "@/types/ticket";

type TicketInfoProps = {
  data: TicketDetail;
};

const TicketInfo = ({ data }: TicketInfoProps) => {
  const category = categories.find((category) => category.id === data.category);
  const ticketCategory = category?.title ?? "";

  return (
    <div className="flex items-center gap-4 md:gap-5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg md:h-28 md:w-28">
        <Image src={data.image} alt={data.title} fill sizes="112px" className="object-cover" />
      </div>

      <div className="min-w-0">
        <p className="text-muted mb-1 text-xs font-medium md:text-sm">{ticketCategory}</p>

        <h1 className="truncate text-lg font-bold md:text-2xl">{data.title}</h1>

        <p className="text-subtle mt-1 text-xs md:text-sm">
          {data.start_date} ~ {data.end_date}
        </p>

        <p className="text-muted mt-1 text-xs font-medium md:text-sm">{data.venues.name}</p>
      </div>
    </div>
  );
};

export default TicketInfo;
