export interface User {
  id: string;
  status: string;
  givenName: string;
  familyName: string;
  email: string;
  sub: string;
  likedPosts?: string[];
}
