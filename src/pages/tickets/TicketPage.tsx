import Container from "@/components/layout/Container";

import SearchBar from "../home/components/SearchBar";
import CategoryFilterList from "./components/CategoryFilterList";
import TicketList from "./components/TicketList";
import TicketsTopBanner from "./components/TicketsTopBanner";

const TicketPage = () => {
  return (
    <div className="w-full">
      <TicketsTopBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        <SearchBar />
      </div>
      <div className="mt-10 flex justify-center">
        <Container>
          <CategoryFilterList />
          <TicketList />
        </Container>
      </div>
    </div>
  );
};

export default TicketPage;
