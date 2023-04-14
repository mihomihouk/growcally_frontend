export interface UploadPost {
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
  author: string;
  createdAt: string;
  likes?: number;
  caption: string;
  files?: MediaFile[];
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
