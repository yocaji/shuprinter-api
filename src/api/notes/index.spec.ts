import { SELF } from 'cloudflare:test';

beforeAll(async () => {
  const noteId = '10000000-0000-0000-0000-000000000001';
  const response = await SELF.fetch(`https://example.com/api/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: 'メモ1',
      content: 'メモ1の本文',
      userId: 'USER001XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    }),
  });
  expect(response.status).toBe(200);
});

afterAll(async () => {
  const noteId = '10000000-0000-0000-0000-000000000001';
  const response = await SELF.fetch(`https://example.com/api/notes/${noteId}`, {
    method: 'DELETE',
  });
  expect(response.status).toBe(200);
});

describe('GET', () => {
  describe('正常系', () => {
    test('レスポンスコードが200であること', async () => {
      const noteId = '10000000-0000-0000-0000-000000000001';
      const response = await SELF.fetch(
        `https://example.com/api/notes/${noteId}`,
        { method: 'GET' },
      );
      expect(response.status).toBe(200);
    });

    test('レスポンスにid, subject, content, userId, updatedAt, createdAtが含まれること', async () => {
      const noteId = '10000000-0000-0000-0000-000000000001';
      const response = await SELF.fetch(
        `https://example.com/api/notes/${noteId}`,
        { method: 'GET' },
      );
      const data = await response.text().then((text) => JSON.parse(text));
      expect(data).toMatchObject({
        id: '10000000-0000-0000-0000-000000000001',
        subject: 'メモ1',
        content: 'メモ1の本文',
        userId: 'USER001XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      });
      expect(data).toHaveProperty('updatedAt');
      expect(data).toHaveProperty('createdAt');
    });
  });

  describe('異常系', () => {
    describe('Resource Not Found', () => {
      test('noteKeyが空のStringの時、Not Foundとなること', async () => {
        const noteId = '';
        const response = await SELF.fetch(
          `https://example.com/api/notes/${noteId}`,
          {
            method: 'GET',
          },
        );
        expect(response.status).toBe(404);
        expect(await response.text()).toBe('404 Not Found');
      });

      test('存在しないkeyの時、Not Foundとなること', async () => {
        const noteId = '90000000-0000-0000-0000-000000000001';
        const response = await SELF.fetch(
          `https://example.com/api/notes/${noteId}`,
          { method: 'GET' },
        );
        expect(response.status).toBe(404);
        expect(await response.json()).toMatchObject({
          code: 404,
          message: 'Not Found',
        });
      });
    });

    describe('Validation Error', () => {
      test('noteIdが文字数不足の時、バリデーションエラーとなること', async () => {
        const noteId = '90000000-0000-0000-0000-00000000035';
        const response = await SELF.fetch(
          `https://example.com/api/notes/${noteId}`,
          { method: 'GET' },
        );
        expect(response.status).toBe(400);
        expect(await response.json()).toMatchObject({
          code: 400,
          message: 'Validation Error',
        });
      });

      test('noteKeyが文字数オーバーの時、バリデーションエラーとなること', async () => {
        const noteId = '90000000-0000-0000-0000-0000000000037';
        const response = await SELF.fetch(
          `https://example.com/api/notes/${noteId}`,
          { method: 'GET' },
        );
        expect(response.status).toBe(400);
        expect(await response.json()).toMatchObject({
          code: 400,
          message: 'Validation Error',
        });
      });

      test('noteIdがnullの時、バリデーションエラーとなること', async () => {
        const noteId = null;
        const response = await SELF.fetch(
          `https://example.com/api/notes/${noteId}`,
          { method: 'GET' },
        );
        expect(response.status).toBe(400);
        expect(await response.json()).toMatchObject({
          code: 400,
          message: 'Validation Error',
        });
      });
    });
  });
});
