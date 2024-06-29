"use client";

import { useQuery } from "react-query";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import Post from "@/components/posts/Post";
import { Post as PostType } from "@/types";
import Link from "next/link";

// Fetching function
const fetchPosts = async (): Promise<PostType[]> => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("createdAt", "desc"));
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

const Posts = () => {
  const { data: posts, error, isLoading } = useQuery("posts", fetchPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <Post post={post} />
          </Link>
        ))
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
};

export default Posts;
