export interface Post {
  id: string;
  author: string;
  createdAt: string;
  likes?: number;
  description: string;
  comments?: Comment[];
}

export interface Comment {
  authorId: string;
  updatedAt: string;
  likes?: number;
  replies?: Reply[];
}

export interface Reply {
  authorId: string;
  updatedAt: string;
  likes?: number;
}
