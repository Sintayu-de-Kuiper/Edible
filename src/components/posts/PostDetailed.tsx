"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Comment, Post, User } from "@/types";
import LikeButton from "@/components/posts/LikeButton";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useRouter } from "next/navigation";

interface PostProps {
  post: Post;
}

const PostDetailed = ({ post }: PostProps) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [newComment, setNewComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(post.title);
  const [editedContent, setEditedContent] = useState<string>(post.content);

  useEffect(() => {
    // Fetch user details for each comment only once
    const fetchCommentUsers = async () => {
      const updatedComments = await Promise.all(
        post.comments.map(async (comment) => {
          const userDoc = await getDoc(doc(db, "users", comment.userId));
          const user = userDoc.exists() ? (userDoc.data() as User) : null;
          return { ...comment, user };
        }),
      );
      setComments(updatedComments);
    };

    fetchCommentUsers();
  }, [post.comments]);

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const commentData = {
      userId: currentUser.uid,
      content: newComment,
      createdAt: serverTimestamp(),
    };

    try {
      const commentRef = await addDoc(
        collection(db, `posts/${post.id}/comments`),
        commentData,
      );
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      const user = userDoc.exists() ? (userDoc.data() as User) : null;
      setComments([...comments, { id: commentRef.id, ...commentData, user }]);
      setNewComment("");
      console.log("Comment added successfully.");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "posts", post.id), {
        title: editedTitle,
        content: editedContent,
      });
      console.log("Post updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const handleDelete = async () => {
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (!confirmation) return;

    try {
      await deleteDoc(doc(db, "posts", post.id));
      console.log("Post deleted successfully.");
      router.push("/"); // Redirect to homepage or another page
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div className="border-l border-b border-r p-4">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="mb-4">
          <input
            type="text"
            className="w-full border rounded p-2 mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit title"
          />
          <textarea
            className="w-full border rounded p-2 mb-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edit content"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1 className="font-bold text-2xl">{post.title}</h1>
          <Image
            src={post.imageUrl}
            alt={`${post.title} image`}
            width={640}
            height={640}
            className="border rounded-2xl"
          />
          <p className="text-gray-700">{post.content}</p>
          {currentUser?.uid === post.userId && (
            <div className="flex gap-2 mt-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit Post
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete Post
              </button>
            </div>
          )}
        </>
      )}

      <LikeButton postId={post.id} likes={post.likes} />

      <div className="mt-4">
        <h2 className="font-bold text-xl mb-2">Comments ({comments.length})</h2>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            className="w-full border rounded p-2 mb-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-t border-gray-300 py-2">
              <p>{comment.content}</p>
              <small>Posted by: {comment.user?.name ?? comment.userId}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailed;
