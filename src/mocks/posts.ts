import { Post } from '../interfaces/post';
import { mockUser } from './user';

export const mockPostItem1: Post = {
  id: '123',
  author: mockUser,
  caption: 'test',
  createdAt: '2023-06-19T15:30:00Z',
  files: [
    {
      id: '123',
      fileName: 'Vegetable garden',
      size: '60b170c0-7673-46c4-a71d-861845ae9097',
      mimetype: 'image/jpeg',
      alt: 'Vegetable garden',
      portraitFileKey:
        'b269db9743e39238bb1babce7e70fb0db134f45dc222efac56e324016b764xxx',
      squareFileKey:
        'adked8886bd2f14f824914e5e87387136471a4aaf630f1073bcdg7cba',
      portraitFileUrl: '/image/mock-post-image.png?'
    }
  ],
  totalLikes: 5,
  comments: [],
  totalComments: 7,
  updatedAt: '2023-06-19T15:30:00Z'
};

export const mockPostItem2: Post = {
  id: '456',
  author: mockUser,
  caption: 'test2',
  createdAt: '2023-06-20T15:30:00Z',
  files: [
    {
      id: '234',
      fileName: 'Muddy day',
      size: '60b170c0-7673-46c4-a71d-861845ae9097',
      mimetype: 'image/jpeg',
      alt: 'Children in mud',
      portraitFileKey:
        'b269db9743e39238bb1babce7e70fb0db134f45dc222efac56e324016b764zzz',
      squareFileKey: 'adked8886bd2f14f824914e5e87387136471a4aaf630f1073bcdgopd',
      portraitFileUrl: '/image/mock-post-image.png?'
    }
  ],
  totalLikes: 5,
  comments: [
    {
      id: '456',
      content: 'You did a great job!',
      updatedAt: '2023-06-19T15:30:00Z',
      author: mockUser
    }
  ],
  totalComments: 7,
  updatedAt: '2023-06-20T15:30:00Z'
};
