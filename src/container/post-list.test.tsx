import { rest } from 'msw';
import config from '../config';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../util/test';
import { PostList } from './post-list';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const baseURL = `${config.apiUrl}`;

export const handlers = [
  rest.get(`${baseURL}/post/get-posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 'XYZ',
          author: 'Carrot Legend',
          likes: 29,
          caption: 'Preparing seedlings for summer',
          files: [
            {
              id: '02ef20fc-3df4-4c32-bfaa-996be4de9468',
              fileName: 'summer_seedlings.png',
              size: 126545,
              mimetype: 'image/png',
              alt: null,
              fileKey:
                '61e2c4c644ea08025a86ab4ed0bddbe6617cb90904605ce53147755a08221d2a',
              fileUrl:
                'https://growcally.s3.eu-west-2.amazonaws.com/61e2c4c644ea08025a86ab4ed0bddbe6617cb90904605ce53147755a08221d2a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2T5BH5RHUF6342G4%2F20230425%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230425T083557Z&X-Amz-Expires=3600&X-Amz-Signature=fa689421c1cb84d2a79bdc84e00d18510451dc8c9fd83ca1646a9e51a7d54897&X-Amz-SignedHeaders=host&x-id=GetObject'
            }
          ],
          createdAt: '2023-04-20T14:37:43.449Z',
          updatedAt: '2023-04-20T14:37:43.449Z',
          totalComments: 0
        }
      ]),
      ctx.delay(150)
    );
  })
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('should show posts list after loading', async () => {
  renderWithProviders(<PostList />);

  await screen.findByText('Carrot Legend');
  const postListEl = screen.getByTestId('posts-list');
  expect(postListEl).toBeInTheDocument();
});
