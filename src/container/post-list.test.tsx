import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../util/test';
import { PostItem, PostList } from './post-list';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardPage } from '../pages/dashboard-page';
import { handlers } from '../mock/handlers';
import config from '../config';
import { User } from '../interfaces/user';
import { createPreloadedState } from '../store/store';
import { Post } from '../interfaces/post';
import { formatDistanceToNow } from 'date-fns';

const mockUser: User = {
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

const mockPostItem1: Post = {
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

const mockPostItem2: Post = {
  id: '123',
  author: mockUser,
  caption: 'test',
  createdAt: '2023-06-19T15:30:00Z',
  files: [
    {
      id: '234',
      fileName: 'Vegetable garden',
      size: '60b170c0-7673-46c4-a71d-861845ae9097',
      mimetype: 'image/jpeg',
      alt: 'Vegetable garden',
      portraitFileKey:
        'b269db9743e39238bb1babce7e70fb0db134f45dc222efac56e324016b764zzz',
      squareFileKey: 'adked8886bd2f14f824914e5e87387136471a4aaf630f1073bcdgopd',
      portraitFileUrl: '/image/mock-post-image.png?'
    }
  ],
  totalLikes: 5,
  comments: [
    {
      id: '123',
      content: 'You did a great job!',
      updatedAt: '2023-06-19T15:30:00Z',
      author: mockUser
    }
  ],
  totalComments: 7,
  updatedAt: '2023-06-19T15:30:00Z'
};

const baseURL = config.apiUrl;

const server = setupServer(...handlers);
beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('PostItem', () => {
  it('should render item with all the information', () => {
    renderWithProviders(
      <PostItem
        id={mockPostItem1.id}
        author={mockPostItem1.author}
        caption={mockPostItem1.caption}
        createdAt={mockPostItem1.createdAt}
        files={mockPostItem1.files}
        totalLikes={mockPostItem1.totalLikes}
        comments={mockPostItem1.comments}
      />
    );
    expect(screen.getByText('Carrot Legend')).toBeInTheDocument();
    const formattedDate = formatDistanceToNow(
      new Date(mockPostItem1.createdAt)
    );
    expect(screen.getByText(`${formattedDate} ago`)).toBeInTheDocument();
    expect(screen.getByAltText('Vegetable garden')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('5 likes')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a comment')).toBeInTheDocument();
    expect(screen.getByTestId('submit button')).toBeDisabled();
  });

  it('should render a button to see comments if the post has a comment', () => {
    renderWithProviders(
      <PostItem
        id={mockPostItem2.id}
        author={mockPostItem2.author}
        caption={mockPostItem2.caption}
        createdAt={mockPostItem2.createdAt}
        files={mockPostItem2.files}
        totalLikes={mockPostItem2.totalLikes}
        comments={mockPostItem2.comments}
      />
    );

    expect(screen.getByTestId('view comments')).toHaveTextContent(
      'View 1 comment'
    );
  });
});

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
    expect(screen.getByTestId('main loader')).toBeInTheDocument();
    expect(await screen.findByText('Carrot Legend')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a comment')).toBeInTheDocument();
  });

  it('renders "No posts yet" message when there are no posts', async () => {
    server.use(
      rest.get(`${baseURL}/post/get-posts`, (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    renderWithProviders(<DashboardPage />);

    expect(screen.getByTestId('main loader')).toBeInTheDocument();
    expect(screen.getByText('No posts yet')).toBeInTheDocument();
  });
});
