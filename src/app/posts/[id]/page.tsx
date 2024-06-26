import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";
import PostDetailPage from "@/components/posts/PostDetailPage";

const PostDetail: React.FC = () => {
  return (
    <main className={"grid grid-cols-[1fr_2fr_1fr] min-h-screen"}>
      <div>
        <Navbar />
      </div>
      <div>
        <PostDetailPage />
      </div>
      <div>
        <Search />
      </div>
    </main>
  );
};

export default PostDetail;
