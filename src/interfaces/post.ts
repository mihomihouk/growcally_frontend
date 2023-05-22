import { User } from './user';

export interface UploadPost {
  authorId: string;
  caption: string;
  files: UploadFile[];
}

export interface UploadFile {
  id: string;
  file: File;
  altText?: string;
}

export interface Post {
  id: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  files: MediaFile[];
  caption: string;
  totalLikes: number;
  totalComments: number;
  comments?: Comment[];
}

export interface MediaFile {
  id: string;
  fileName: string;
  size: string;
  mimetype: string;
  alt: string;
  fileKey: string;
  fileUrl?: string;
}

export interface Comment {
  id: string;
  content: string;
  updatedAt: string;
  author: User;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  commentId: string;
}
