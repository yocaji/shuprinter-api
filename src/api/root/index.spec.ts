import { SELF } from 'cloudflare:test';

describe('GET /', () => {
  test('レスポンスコードが200であること', async () => {
    const response = await SELF.fetch('http://example.com');
    expect(response.status).toBe(200);
  });
  test('レスポンスボディがWelcome...であること', async () => {
    const response = await SELF.fetch('http://example.com');
    const data = await response.text();
    console.log(data);
    expect(data).contains('Welcome to SprintPost!');
  });
});
