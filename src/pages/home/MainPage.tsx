import Container from "@/components/layout/Container";

import CategoryList from "./components/CategoryList";
import MainBanner from "./components/MainBanner";
import PopularTicketList from "./components/PopularTicketList";
import SearchBar from "./components/SearchBar";
import ServiceBannerList from "./components/service-banner/ServiceBannerList";

const MainPage = () => {
  return (
    <div className="w-full">
      <MainBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        <SearchBar />
      </div>
      <div className="mt-10 flex justify-center">
        <Container>
          <div className="flex flex-col gap-15">
            <CategoryList />
            <PopularTicketList />
            <ServiceBannerList />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
