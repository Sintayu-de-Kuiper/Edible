import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";
import React from "react";

const SearchPage = () => {
  return (
    <>
      {/* Navbar sidebar */}
      <div className="w-3/12 border-r border-gray-200">
        <Navbar />
      </div>
      {/* Main content area */}
      <div className="w-6/12 border-r border-gray-200">
        <Search />
      </div>
    </>
  );
};

export default SearchPage;
