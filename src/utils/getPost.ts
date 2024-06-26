import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { Comment, Like, Post } from "@/types";
import { db } from "@/lib/firebase";

export const getPost = async (id: string): Promise<Post> => {
  const postRef = doc(db, "posts", id);
  const postDoc = await getDoc(postRef);

  if (!postDoc.exists()) {
    throw new Error("No such document!");
  }

  // Fetch likes sub-collection
  const likesRef = collection(postRef, "likes");
  const likesSnapshot = await getDocs(likesRef);
  const likes: Like[] = likesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Like[];

  // Fetch comments sub-collection
  const commentsRef = collection(postRef, "comments");
  const commentsSnapshot = await getDocs(commentsRef);
  const comments: Comment[] = commentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];

  return {
    id: postDoc.id,
    ...postDoc.data(),
    likes,
    comments,
  } as unknown as Post;
};
