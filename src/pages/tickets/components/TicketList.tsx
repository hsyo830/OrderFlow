import { tickets } from "@/constants/mocks/tickets";

import TicketListItem from "./TicketListItem";

const TicketList = () => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3">
        {tickets.map((item) => (
          <TicketListItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
