import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";
import Feed from "@/components/feed/Feed";

// HomePage component renders the main content feed
const HomePage: React.FC = () => {
  return (
    <>
      {/* Navbar sidebar */}
      <div className="w-3/12">
        <Navbar />
      </div>
      {/* Main content area */}
      <div className="w-6/12">
        <Feed />
      </div>
      {/* Search sidebar */}
      <div className="w-3/12">
        <Search />
      </div>
    </>
  );
};

export default HomePage;
