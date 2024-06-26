import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";
import PostDetailPage from "@/components/posts/PostDetailPage";

const PostDetail: React.FC = () => {
  return (
    <>
      <div className="w-3/12">
        <Navbar />
      </div>
      <div className="w-6/12">
        <PostDetailPage />
      </div>
      <div className="w-3/12">
        <Search />
      </div>
    </>
  );
};

export default PostDetail;
