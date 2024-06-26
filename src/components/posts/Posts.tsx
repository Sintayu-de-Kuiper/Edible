import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import Post from "@/components/posts/Post";
import { Post as PostType } from "@/types";

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
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
