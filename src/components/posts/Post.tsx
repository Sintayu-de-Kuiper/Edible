import Image from "next/image";
import { Post as PostType } from "@/types";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="border p-4">
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <Image
        src={post.imageUrl}
        alt={`${post.title} image`}
        width={640}
        height={640}
        className="rounded-lg"
      />
    </div>
  );
};

export default Post;
