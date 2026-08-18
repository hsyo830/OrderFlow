import SearchBar from "../home/components/SearchBar";
import TicketsTopBanner from "./components/TicketsTopBanner";

const TicketPage = () => {
  return (
    <div className="w-full">
      <TicketsTopBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        <SearchBar />
      </div>
    </div>
  );
};

export default TicketPage;
