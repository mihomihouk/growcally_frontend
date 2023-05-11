import { User } from './user';

export interface Account {
  id: string;
  ownerId: string;
  owner: User;
}
