"use client";

import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import React from "react";
import PostDetailed from "@/components/posts/PostDetailed";
import { getPost } from "@/utils/getPost";

export default function PostDetailPage() {
  const { id } = useParams();
  if (Array.isArray(id)) {
    throw new Error("Invalid ID");
  }

  const {
    data: post,
    error,
    isLoading,
  } = useQuery(["postDetail", id], async () => await getPost(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return <PostDetailed post={post} />;
}
