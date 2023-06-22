import { User } from '../interfaces/user';

export const mockUser: User = {
  id: '123',
  status: 'active',
  givenName: 'Carrot',
  familyName: 'Legend',
  email: 'carrotlegend@example.com',
  bio: 'Lorem ipsum dolor sit amet.',
  profileImage: {
    id: '12345',
    fileName: 'profile.jpg',
    size: 1024,
    mimetype: 'image/jpeg',
    fileKey: 'abcde12345',
    fileUrl: 'https://example.com/profile.jpg?'
  },
  sub: 'xyz123',
  posts: ['post1', 'post2'],
  likedPosts: ['post3', 'post4'],
  account: {
    id: '456',
    ownerId: '123'
  },
  comments: []
};
