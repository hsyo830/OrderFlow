"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Container from "@/components/layout/Container";

import SearchBar from "../home/components/SearchBar";
import CategoryFilterList from "./components/CategoryFilterList";
import TicketList from "./components/TicketList";
import TicketsTopBanner from "./components/TicketsTopBanner";

const parsePage = (value: string | null) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

const buildTicketsURL = (query: string, page: number) => {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));

  const queryString = params.toString();
  return queryString ? `/tickets?${queryString}` : "/tickets";
};

const TicketPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [page, setPage] = useState(() => parsePage(searchParams.get("page")));

  // page 전환은 Next 라우팅 라이프사이클을 안 태우도록 history.replaceState로만
  // URL을 조용히 갱신한다 (router.replace는 검색처럼 "진짜" 내비게이션에만 사용).
  const searchQueryRef = useRef(searchQuery);
  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    window.history.replaceState(null, "", buildTicketsURL(searchQueryRef.current, page));
  }, [page]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
    router.replace(buildTicketsURL(value, 1));
  };

  return (
    <div className="w-full">
      <TicketsTopBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        <SearchBar defaultValue={initialQuery} onSearch={handleSearch} />
      </div>
      <div className="mt-10 flex justify-center">
        <Container>
          {/* <CategoryFilterList /> */}
          <TicketList searchQuery={searchQuery} page={page} onPageChange={setPage} />
        </Container>
      </div>
    </div>
  );
};

export default TicketPage;
