import Image from "next/image";

interface PostProps {
  title: string;
  imageURL: string;
  description: string;
}

const Post = (props: PostProps) => {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <Image
        src={props.imageURL}
        alt="Image could not load!"
        width={640}
        height={640}
      />
    </>
  );
};

export default Post;
