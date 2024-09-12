import { Hono } from 'hono';
import { testClient } from 'hono/testing';

describe('GET /notes/:key', () => {
  test('200 OK が返ること', async () => {
    const key = 'piyo';
    const app = new Hono().get(`/notes/${key}`);
    const res = await testClient(app).notes[key].$get();
    console.log(res);
    expect(res.status).toBe(200);
  });
});
