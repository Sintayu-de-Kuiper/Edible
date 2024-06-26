"use client";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import React from "react";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import PostDetailed from "@/components/posts/PostDetailed";
import { Post } from "@/types";

const fetchPost = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const postDoc = await getDoc(postRef);

  if (!postDoc.exists()) {
    throw new Error("No such document!");
  }

  return {
    id: postDoc.id,
    ...postDoc.data(),
    likes: postDoc.data().likes ?? [],
    comments: postDoc.data().comments ?? [],
  } as unknown as Post;
};

export default function PostDetailPage() {
  const { id } = useParams();
  if (Array.isArray(id)) {
    throw new Error("Invalid ID");
  }

  const {
    data: post,
    error,
    isLoading,
  } = useQuery(["postDetail", id], async () => await fetchPost(id));

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
