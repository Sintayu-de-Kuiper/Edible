import Image from "next/image";
import { Post as PostType } from "@/types";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
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

      <div className={"flex gap-5"}>
        <p>Likes: {post.likes.length}</p>
        <p>Comments: {post.comments.length}</p>
      </div>
    </div>
  );
};

export default Post;
