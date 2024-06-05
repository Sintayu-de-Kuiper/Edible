import Image from "next/image";

export default function Posts() {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      description: "This is the first post",
      image: "/images/1.jpg",
    },
    {
      id: 2,
      title: "Post 2",
      description: "This is the second post",
      image: "/images/2.jpg",
    },
    {
      id: 3,
      title: "Post 3",
      description: "This is the third post",
      image: "/images/3.jpg",
    },
  ];

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <Image src={post.image} alt={post.title} width={200} height={200} />
          </li>
        ))}
      </ul>
    </div>
  );
}
