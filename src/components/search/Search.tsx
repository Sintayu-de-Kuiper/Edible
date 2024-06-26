"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import { Post as PostType } from "@/types";
import Link from "next/link";
import Post from "@/components/posts/Post";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    const postsRef = collection(db, "posts");
    const postsSnapshot = await getDocs(postsRef);
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostType[];

    return posts;
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      const posts = await fetchPosts();
      const filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(filteredPosts);
    };

    handleSearch();
  }, [searchQuery]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-4">
        {searchResults.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block border-gray-200 p-2"
          >
            <Post post={post} />
          </Link>
        ))}
        {searchResults.length === 0 && searchQuery !== "" && (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
