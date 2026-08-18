import Image from "next/image";

import Badge from "@/components/common/Badge";
import { Ticket } from "@/types/ticket";

type PopularTicketCardProps = {
  data: Ticket;
};

const PopularTicketCard = ({ data }: PopularTicketCardProps) => {
  return (
    <div className="group relative h-62 w-full cursor-pointer overflow-hidden rounded-lg md:h-75">
      <Image
        src={data.image}
        alt={data.title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <Badge variant="darkOpacity" text="D-7" className="absolute top-3 right-3 z-20" />
      <div className="from-dark/80 text-inverse absolute right-0 bottom-0 left-0 z-10 flex h-[70%] flex-col justify-end gap-1 bg-linear-to-t from-55% to-transparent to-80% p-4 md:p-5.5">
        <div className="font-semibold">{data.title}</div>
        <div className="mt-1 text-xs font-light md:mt-3 md:text-sm">
          {data.date.start}~{data.date.end}
        </div>
        <div className="text-xs font-light md:text-sm">{data.location}</div>
      </div>
    </div>
  );
};

export default PopularTicketCard;
