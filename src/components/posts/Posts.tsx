import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import Post from "@/components/posts/Post";
import { Post as PostType } from "@/types";
import Link from "next/link";

const Posts = async () => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const postsSnapshot = await getDocs(q);

  const posts: PostType[] = postsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        likes: doc.data().likes ?? [],
        comments: doc.data().comments ?? [],
      }) as PostType,
  );

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

export default Posts;
