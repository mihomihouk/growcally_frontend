import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../util/test';
import { PostList } from './post-list';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardPage } from '../pages/dashboard-page';
import { handlers } from '../mock/handlers';
import config from '../config';
import { User } from '../interfaces/user';
import { createPreloadedState } from '../store/store';

const mockUser: User = {
  id: '123',
  status: 'active',
  givenName: 'John',
  familyName: 'Doe',
  email: 'johndoe@example.com',
  bio: 'Lorem ipsum dolor sit amet.',
  profileImage: {
    id: '12345',
    fileName: 'profile.jpg',
    size: 1024,
    mimetype: 'image/jpeg',
    fileKey: 'abcde12345',
    fileUrl: 'https://example.com/profile.jpg'
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

const baseURL = config.apiUrl;

const server = setupServer(...handlers);
beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('PostList', () => {
  it('should render a post list after loading', async () => {
    const customState = {
      auth: {
        user: mockUser,
        isAuthenticated: true,
        accountId: 'abcdefg'
      }
    };
    const preloadedState = createPreloadedState(customState);
    renderWithProviders(<PostList />, { preloadedState });
    setTimeout(() => {
      expect(screen.getByTestId('main loader')).toBeInTheDocument();
    }, 10000);
    setTimeout(() => {
      expect(screen.getByText('Carrot Legend')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Add a comment')).toBeInTheDocument();
    }, 10000);
  });

  it('renders "No posts yet" message when there are no posts', async () => {
    server.use(
      rest.get(`${baseURL}/post/get-posts`, (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    renderWithProviders(<DashboardPage />);

    setTimeout(() => {
      expect(screen.getByTestId('main loader')).toBeInTheDocument();
    }, 10000);
    setTimeout(() => {
      expect(screen.getByText('No posts yet')).toBeInTheDocument();
    }, 10000);
  });
});
