import { SELF } from 'cloudflare:test';

describe('GET /doc', () => {
  test('レスポンスコードが200であること', async () => {
    const response = await SELF.fetch('https://example.com/api/doc');
    expect(response.status).toBe(200);
  });
  test('OpenAPI Specが表示されること', async () => {
    const response = await SELF.fetch('https://example.com/api/doc');
    const data = await response.json();
    // @ts-expect-error: OpenAPI Specの型を検証する意味がないため
    expect(data.info.title).toBe('SprintPost API');
  });
});

describe('GET /ui', () => {
  test('レスポンスコードが200であること', async () => {
    const response = await SELF.fetch('https://example.com/api/ui');
    expect(response.status).toBe(200);
  });
  test('Swagger UIが表示されること', async () => {
    const response = await SELF.fetch('https://example.com/api/ui');
    const data = await response.text();
    expect(data).toContain('<title>SwaggerUI</title>');
  });
});
