import Image from "next/image";

import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { categories } from "@/constants/Category";
import { Ticket } from "@/types/ticket";

type TicketListItemProps = {
  data: Ticket;
};

const TicketListItem = ({ data }: TicketListItemProps) => {
  const category = categories.find((category) => category.id === data.category);

  const dataCategory = category?.title ?? "";

  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-x-4 gap-y-4 rounded-xl border border-gray-200 p-4 lg:grid-cols-[205px_minmax(0,1fr)_115px_120px] lg:items-center lg:gap-5 lg:p-3">
      <div className="relative h-30 w-30 overflow-hidden rounded-lg lg:h-40 lg:w-50">
        <Image
          src={data.image}
          alt={data.title}
          fill
          sizes="(min-width: 1024px) 200px, 120px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="font-semibold lg:truncate">{data.title}</h3>
        <div className="flex flex-col text-sm text-gray-500 lg:flex-row lg:items-center lg:gap-2">
          <span>
            {data.date.start} ~ {data.date.end}
          </span>
          <span className="hidden lg:inline">|</span>
          <span>{data.location}</span>
        </div>

        <div>
          <Badge variant="soft" text={dataCategory} />
        </div>
      </div>

      <div className="self-center lg:self-auto">
        <span className="font-semibold">₩ {data.price.toLocaleString("ko-KR")}</span>
      </div>

      <div className="flex items-center justify-end">
        <Button variant="primary">예매하기</Button>
      </div>
    </div>
  );
};

export default TicketListItem;
