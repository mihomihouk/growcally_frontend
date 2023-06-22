import { rest } from 'msw';
import config from '../config';
import { mockPostItem1, mockPostItem2 } from './posts';
import { mockUser } from './user';

const baseURL = config.apiUrl;

export const handlers = [
  rest.post(`${baseURL}/auth/signup`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isSuccess: true }));
  }),
  rest.post(`${baseURL}/auth/verify`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isSuccess: true }));
  }),
  rest.post(`${baseURL}/auth/resend-code`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isSuccess: true }));
  }),
  rest.get(`${baseURL}/post/get-posts`, (req, res, ctx) => {
    return res(ctx.json([mockPostItem1, mockPostItem2]));
  }),
  rest.get(`${baseURL}/auth/${mockUser.id}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: { user: mockUser, posts: mockPostItem1 } })
    );
  })
];
