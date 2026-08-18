import { tickets } from "@/constants/mocks/tickets";

import PopularTicketCard from "./PopularTicketCard";

const PopularTicketList = () => {
  const visibleTickets = tickets.slice(0, 5);

  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <h3 className="subtitle">지금 가장 인기 있는 티켓</h3>
        <div className="link-button">더보기 &gt;</div>
      </div>
      <div className="flex gap-3">
        {visibleTickets.map((item, index) => (
          <div
            key={item.id}
            className={
              index < 2 ? "flex-1" : index < 4 ? "hidden flex-1 md:flex" : "hidden flex-1 xl:flex"
            }
          >
            <PopularTicketCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTicketList;
