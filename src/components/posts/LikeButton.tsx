import { useState } from "react";
import { deleteDoc, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import { Like } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface LikeButtonProps {
  postId: string;
  likes: Like[];
}

export default function LikeButton({
  postId,
  likes,
}: Readonly<LikeButtonProps>) {
  const { currentUser } = useAuth();
  const [localLikes, setLocalLikes] = useState<Like[]>(likes);

  const handleLike = async () => {
    if (!currentUser) {
      alert("You must be logged in to like a post.");
      return;
    }

    const postRef = doc(db, `posts/${postId}/likes/${currentUser.uid}`);

    try {
      if (isLikedByCurrentUser) {
        // Unlike the post
        await deleteDoc(postRef);
        setLocalLikes((prev) =>
          prev.filter((like) => like.id !== currentUser.uid),
        );
        console.log("Post unliked successfully.");
      } else {
        // Like the post
        await setDoc(
          postRef,
          {
            id: currentUser.uid,
            likedAt: serverTimestamp(),
          },
          { merge: true },
        );
        setLocalLikes((prev) => [
          ...prev,
          { id: currentUser.uid, likedAt: new Date() },
        ]);
        console.log("Post liked successfully.");
      }
    } catch (error) {
      console.error("Error liking/unliking post: ", error);
    }
  };

  const isLikedByCurrentUser = localLikes.some(
    (like) => like.id === currentUser?.uid,
  );

  return (
    <button
      className={`${isLikedByCurrentUser && "text-red-500"}`}
      onClick={handleLike}
    >
      {isLikedByCurrentUser ? "Unlike" : "Like"} ({localLikes.length})
    </button>
  );
}
