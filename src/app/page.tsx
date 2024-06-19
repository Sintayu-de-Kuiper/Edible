import Posts from "@/components/posts/Posts";
import PostForm from "@/components/posts/PostForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Homepage</h1>
      <PostForm />
      <Posts />
    </main>
  );
}
