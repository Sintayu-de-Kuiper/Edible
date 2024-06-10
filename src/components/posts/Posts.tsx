import Image from "next/image";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/lib/firebase";

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
              <h1>{post.data().title}</h1>
              <Image
                src={post.data().imageUrl}
                alt={post.data().description}
                width={640}
                height={640}
              />
              <p>{post.data().description}</p>
            </li>
          ))
        ) : (
          <li>No posts found</li>
        )}
      </ul>
    </div>
  );
}
