import { SELF } from 'cloudflare:test';

describe('GET /notes/:key', () => {
  test('CFW 200 OK が返ること', async () => {
    const response = await SELF.fetch(
      'https://sprintpost-api.yocaji.workers.dev/notes/piyo',
    );
    expect(response.status).toBe(200);
  });
});
