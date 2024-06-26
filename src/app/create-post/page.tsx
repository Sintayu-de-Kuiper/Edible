import Navbar from "@/components/navbar/Navbar";
import React from "react";
import PostForm from "@/components/create-post/PostForm";

const SearchPage = () => {
  return (
    <main className={"grid grid-cols-[1fr_2fr_1fr] min-h-screen"}>
      {/* Navbar sidebar */}
      <div className="border-r border-gray-200">
        <Navbar />
      </div>
      {/* Main content area */}
      <div className={"flex justify-center items-center"}>
        <PostForm />
      </div>
    </main>
  );
};

export default SearchPage;
