import { Account } from './account';
import { Comment } from './post';

export interface User {
  id: string;
  status: string;
  givenName: string;
  familyName: string;
  email: string;
  sub: string;
  posts?: string[];
  likedPosts?: string[];
  account: Account;
  comments?: Comment[];
}
