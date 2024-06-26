"use client";

import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { db } from "@/lib/firebase";
import Post from "@/components/posts/Post";
import { Post as PostType } from "@/types";
import Link from "next/link";
import { useQuery } from "react-query";

const fetchUserPosts = async (userId: string) => {
  const postsRef = collection(db, "posts");
  const q = query(
    postsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  const postsSnapshot = await getDocs(q);

  return postsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        likes: doc.data().likes ?? [],
        comments: doc.data().comments ?? [],
      }) as PostType,
  );
};

interface UserPostsProps {
  userId: string;
}

const UserPosts = ({ userId }: Readonly<UserPostsProps>) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(["userPosts", userId], () => fetchUserPosts(userId), {
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
};

export default UserPosts;
