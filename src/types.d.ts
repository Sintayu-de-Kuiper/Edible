export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
}
