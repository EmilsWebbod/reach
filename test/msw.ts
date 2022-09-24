import { rest, setupWorker } from 'msw';

const endpoints = [
  rest.get('http://localhost:1000', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ status: 200, message: 'OK' }))
  ),
  rest.get('http://localhost:1000/text', (_req, res, ctx) =>
    res(ctx.status(200), ctx.text('OK'))
  ),
  rest.get('http://localhost:1000/204', (_req, res, ctx) =>
    res(ctx.status(204), ctx.text(''))
  ),
  rest.get('http://localhost:1000/400', (_req, res, ctx) =>
    res(ctx.status(400), ctx.json({ status: 400, message: 'Bad request' }))
  ),
  rest.get('http://localhost:1000/404', (_req, res, ctx) =>
    res(ctx.status(404), ctx.json({ status: 404, message: 'Not found' }))
  ),
  rest.get('http://localhost:1000/500', (_req, res, ctx) =>
    res(ctx.status(500), ctx.json({ status: 500, message: 'Server error' }))
  ),
  rest.get('http://localhost:1000/*', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ status: 200, message: 'OK' }))
  ),
];

export const worker = setupWorker(...endpoints);
