import { rest } from 'msw';

import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';

import { formatDistanceToNow } from 'date-fns';
import { mockPostItem1, mockPostItem2 } from '../../mocks/posts';
import { setupStore } from '../../store/store';
import { mockUser } from '../../mocks/user';
import { setIsAuthenticated, setUser } from '../../slices/auth-slice';
import { PostItem, PostList } from '../post-list';
import { renderWithProviders } from '../../util/test';
import { server } from '../../mocks/server';
import config from '../../config';

const baseURL = config.apiUrl;

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

    expect(screen.getByText('test')).toBeInTheDocument();
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
  it('should render a post list data after loading', async () => {
    const store = setupStore();
    store.dispatch(setUser(mockUser));
    store.dispatch(setIsAuthenticated(true));
    renderWithProviders(<PostList />, { store });
    await waitForElementToBeRemoved(() => screen.queryByTestId('main loader'));
    const postEl1 = await screen.findByText('test');
    const postEl2 = await screen.findByText('test2');
    expect(postEl1).toBeInTheDocument();
    expect(postEl2).toBeInTheDocument();
  });

  it('should render a message and button if there is no post', async () => {
    server.use(
      rest.get(`${baseURL}/post/get-posts`, (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );
    const store = setupStore();
    store.dispatch(setUser(mockUser));
    store.dispatch(setIsAuthenticated(true));
    renderWithProviders(<PostList />, { store });
    await waitForElementToBeRemoved(() => screen.queryByTestId('main loader'));
    const messageEl = await screen.findByText(
      'Create a new post to get started.'
    );
    expect(messageEl).toBeInTheDocument();
    const btnEl = await screen.findByRole('button');
    expect(btnEl).toHaveTextContent('Create Post');
  });
});
