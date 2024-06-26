import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import Post from "@/components/post/Post";

export default async function Posts() {
  const querySnapshot = await getDocs(collection(db, "posts"));

  console.log(querySnapshot);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {querySnapshot.docs.length > 0 ? (
          querySnapshot.docs.map((post) => (
            <li key={post.id}>
              <Post
                title={post.data().title}
                imageURL={post.data().imageUrl}
                description={post.data().description}
              />
            </li>
          ))
        ) : (
          <li>No posts found</li>
        )}
      </ul>
    </div>
  );
}
