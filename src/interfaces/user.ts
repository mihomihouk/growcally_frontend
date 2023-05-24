import { Account } from './account';
import { Comment } from './post';

export interface User {
  id: string;
  status: string;
  givenName: string;
  familyName: string;
  email: string;
  bio?: string;
  profileImage?: ProfileImageFile;
  sub: string;
  posts?: string[];
  likedPosts?: string[];
  account: Account;
  comments?: Comment[];
}

export interface ProfileImageFile {
  id?: string;
  fileName: string;
  size: number;
  mimetype: string;
  fileKey: string;
  fileUrl?: string;
}
