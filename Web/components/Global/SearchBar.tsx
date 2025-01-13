"use client";

import React, { useState, useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("courseName") || ""
  );

  const debouncedSearch = useDebouncedCallback((term: string) => {
    if (term) {
      const baseurl = "/search";
      const url = qs.stringify({ courseName: term }, { addQueryPrefix: true });
      router.push(baseurl + url);
    } else {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("courseName");
      router.push(newUrl.toString());
    }
  }, 500);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      debouncedSearch(term);
    },
    [debouncedSearch]
  );

  return (
    <div className="w-full relative">
      <Input
        className="w-full rounded-md focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:shadow-sm"
        placeholder="Ara..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Button
        variant="link"
        className="absolute right-0 top-0"
        onClick={() => debouncedSearch(searchTerm)}
      >
        <Search width={15} height={15} />
      </Button>
    </div>
  );
};

export default SearchBar;
