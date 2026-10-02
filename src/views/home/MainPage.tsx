"use client";

import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container";

import MainBanner from "./components/MainBanner";
import PopularTicketList from "./components/PopularTicketList";
import SearchBar from "./components/SearchBar";
import ServiceBannerList from "./components/service-banner/ServiceBannerList";

const MainPage = () => {
  const router = useRouter();

  const handleSearch = (value: string) => {
    const keyword = value.trim();
    router.push(`/tickets?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="w-full">
      <MainBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mt-10 flex justify-center">
        <Container>
          <div className="flex flex-col gap-15">
            <PopularTicketList />
            <ServiceBannerList />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
