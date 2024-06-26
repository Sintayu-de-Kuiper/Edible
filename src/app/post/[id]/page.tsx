import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";

const PostDetailPage: React.FC = () => {
  return (
    <>
      <div className="w-3/12">
        <Navbar />
      </div>
      <div className="w-6/12"></div>
      <div className="w-3/12">
        <Search />
      </div>
    </>
  );
};

export default PostDetailPage;
