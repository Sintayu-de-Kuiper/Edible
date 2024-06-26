export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  createdAt: Date;
  likes: Like[];
  comments: Comment[];
}

export interface Like {
  id: string;
  userId: string;
  likedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}
