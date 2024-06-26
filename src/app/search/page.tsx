import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";
import React from "react";

const SearchPage = () => {
  return (
    <main className={"grid grid-cols-[1fr_2fr_1fr] min-h-screen"}>
      {/* Navbar sidebar */}
      <div className="border-r border-gray-200">
        <Navbar />
      </div>
      {/* Main content area */}
      <div>
        <Search />
      </div>
    </main>
  );
};

export default SearchPage;
