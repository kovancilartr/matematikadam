import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <>
      <div className="w-full relative">
        <Input
          className="w-full rounded-md focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:shadow-sm"
          placeholder="Ara..."
        />
        <Button variant="link" className="absolute right-0 top-0">
          <Search width={15} height={15} />
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
