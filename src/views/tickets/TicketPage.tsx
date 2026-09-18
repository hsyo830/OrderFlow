"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Container from "@/components/layout/Container";

import SearchBar from "../home/components/SearchBar";
import CategoryFilterList from "./components/CategoryFilterList";
import TicketList from "./components/TicketList";
import TicketsTopBanner from "./components/TicketsTopBanner";

const TicketPage = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  return (
    <div className="w-full">
      <TicketsTopBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        <SearchBar defaultValue={initialQuery} onSearch={setSearchQuery} />
      </div>
      <div className="mt-10 flex justify-center">
        <Container>
          {/* <CategoryFilterList /> */}
          <TicketList searchQuery={searchQuery} />
        </Container>
      </div>
    </div>
  );
};

export default TicketPage;
