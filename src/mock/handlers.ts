import { rest } from 'msw';
import config from '../config';

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
    return res(
      ctx.json([
        {
          id: 'XYZ',
          likes: 29,
          caption: 'Preparing seedlings for summer',
          files: [
            {
              id: '02ef20fc-3df4-4c32-bfaa-996be4de9468',
              fileName: 'summer_seedlings.jpg',
              size: 126545,
              mimetype: 'image/png',
              alt: null,
              portraitFileKey:
                '86db1dbd79042d57bcf4caec10505887c28a96ce73cf716b46312734b9183e55',
              squareFileKey:
                '8c44b4aac95d37c081dfeada6a3ce7d5a686e72283582a8503e706f303e32abd',
              portraitUrl:
                'https://growcally.s3.eu-west-2.amazonaws.com/86db1dbd79042d57bcf4caec10505887c28a96ce73cf716b46312734b9183e55?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2T5BH5RHUF6342G4%2F20230601%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230601T084448Z&X-Amz-Expires=3600&X-Amz-Signature=077e27fe1171ce740025dd192cbfd32f61161a8574f3bd3c787d78f889d6c104&X-Amz-SignedHeaders=host&x-id=GetObject',
              squareFileUrl:
                'https://growcally.s3.eu-west-2.amazonaws.com/8c44b4aac95d37c081dfeada6a3ce7d5a686e72283582a8503e706f303e32abd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2T5BH5RHUF6342G4%2F20230601%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230601T084448Z&X-Amz-Expires=3600&X-Amz-Signature=b41e64d6492839a83ce5c59e8de74ee471fad6b5fc61174dca3819173861bab1&X-Amz-SignedHeaders=host&x-id=GetObject'
            }
          ],
          createdAt: '2023-04-20T14:37:43.449Z',
          updatedAt: '2023-04-20T14:37:43.449Z',
          author: {
            id: 'f9cdbe02-9abf-4d3c-91b6-54fa91bccaed',
            status: 'CONFIRMED',
            givenName: 'Growcally',
            familyName: 'App',
            email: 'test@gmail.com',
            sub: '03fe498c-ab08-4ebd-b304-3938939e788a'
          },
          totalLikes: 1,
          totalComments: 0,
          comments: []
        }
      ])
    );
  })
];
