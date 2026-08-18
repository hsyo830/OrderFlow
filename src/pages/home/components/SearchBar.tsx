"use client";

import { useState } from "react";

import SearchIcon from "@/components/icons/SearchIcon";
import Container from "@/components/layout/Container";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar = ({
  placeholder = "공연, 아티스트, 팀, 장소를 검색해보세요",
  onSearch,
}: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <div className="flex w-full justify-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-surface border-border focus-within:border-input-focus flex w-full items-center rounded-xl border py-4 pr-1.5 pl-5 shadow-lg transition-colors"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="text-text placeholder:text-placeholder flex-1 bg-transparent text-sm outline-none md:text-base"
          />
          <button type="submit" aria-label="검색" className="flex cursor-pointer transition-colors">
            <SearchIcon className="text-brand hover:text-brand-hover active:text-brand-active size-4 md:size-9" />
          </button>
        </form>
      </Container>
    </div>
  );
};

export default SearchBar;
