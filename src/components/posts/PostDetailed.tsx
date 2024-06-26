import Image from "next/image";
import { useEffect, useState } from "react";
import { Comment, Post, User } from "@/types";
import LikeButton from "@/components/posts/LikeButton";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "@firebase/firestore";

interface PostProps {
  post: Post;
}

const PostDetailed = ({ post }: PostProps) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    // Fetch user details for each comment
    const fetchCommentUsers = async () => {
      const updatedComments = await Promise.all(
        comments.map(async (comment) => {
          const userDoc = await getDoc(doc(db, "users", comment.id));
          const user = userDoc.exists() ? (userDoc.data() as User) : null;
          return { ...comment, user };
        }),
      );
      setComments(updatedComments);
    };

    fetchCommentUsers();
  }, [comments]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="border-l border-b border-r p-4">
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <Image
        src={post.imageUrl}
        alt={`${post.title} image`}
        width={640}
        height={640}
        className="border rounded-2xl"
      />
      <p className="text-gray-700">{post.content}</p>

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
