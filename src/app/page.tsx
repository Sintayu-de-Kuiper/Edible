import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";
import Posts from "@/components/posts/Posts";

const HomePage: React.FC = () => {
  return (
    <main className={"grid grid-cols-[1fr_2fr_1fr] min-h-screen"}>
      {/* Navbar sidebar */}
      <div className="border-r border-gray-200">
        <Navbar />
      </div>
      {/* Main content area */}
      <div>
        <Posts />
      </div>
      {/* Search sidebar */}
      <div className="border-l border-gray-200">
        <Search />
      </div>
    </main>
  );
};

export default HomePage;
