import Image from "next/image";

interface PostProps {
  id: string;
  title: string;
  imageURL: string;
  description: string;
}

const Post = (props: PostProps) => {
  return (
    <div className="border-l border-b border-r p-4">
      <h1 className="font-bold text-2xl">{props.title}</h1>
      <Image
        src={props.imageURL}
        alt="Image could not load!"
        width={640}
        height={640}
        className="border rounded-2xl"
      />
    </div>
  );
};

export default Post;
