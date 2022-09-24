import { describe, expect, it } from 'vitest';
import { Reach, ReachApi } from '../core';

const api = new ReachApi('http://localhost:1000', {});

interface BasicResponse {
  status: 200;
  message: string;
}

describe('React', () => {
  const test = new Reach(api);

  it('should fetch data', async () => {
    const response = await test.get<BasicResponse>('/get');
    expect(response.status).toBe(200);
  });
});
