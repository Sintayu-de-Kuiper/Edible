import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import Post from "@/components/post/Post";

export default async function Posts() {
  const querySnapshot = await getDocs(collection(db, "posts"));

  console.log(querySnapshot);

  return (
    <div>
      <ul>
        {querySnapshot.docs.length > 0 ? (
          querySnapshot.docs.map((post) => (
            <li key={post.id}>
              {" "}
              {/* ToDo: Add onClick */}
              <Post
                id={post.data().uid}
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
