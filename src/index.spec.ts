import { SELF } from 'cloudflare:test';

describe('GET /doc', () => {
  test('レスポンスコードが200であること', async () => {
    const response = await SELF.fetch('http://example.com/doc');
    expect(response.status).toBe(200);
  });
  test('OpenAPI Specが表示されること', async () => {
    const response = await SELF.fetch('http://example.com/doc');
    const data = await response.json();
    // @ts-ignore
    expect(data.info.title).toBe('SprintPost API');
  });
});
