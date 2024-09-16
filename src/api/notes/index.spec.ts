import { SELF } from 'cloudflare:test';

describe('Happy path', () => {
  test('レスポンスコードが200であること', async () => {
    const noteKey =
      'b975ceeb58c2bb1d9bdf6162c64c5e2dde2b3493397ceb85841ab50714653a38';
    const response = await SELF.fetch(`http://example.com/notes/${noteKey}`);
    expect(response.status).toBe(200);
  });

  test('noteKey, subject, contentが含まれること', async () => {
    const noteKey =
      'b975ceeb58c2bb1d9bdf6162c64c5e2dde2b3493397ceb85841ab50714653a38';
    const response = await SELF.fetch(`http://example.com/notes/${noteKey}`);
    const data = await response.text();
    expect(data).contains('noteKey');
    expect(data).contains('subject');
    expect(data).contains('content');
  });
});

describe('Validation Error', () => {
  test('noteKeyが文字数オーバーの時、バリデーションエラーとなること', async () => {
    const noteKey =
      'this_is_63_characters_string_1234567890abcdefghijklmnopqrstuvwx';
    const response = await SELF.fetch(`http://example.com/notes/${noteKey}`);
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      code: 400,
      message: 'Validation Error',
    });
  });

  test('noteKeyが文字数不足の時、バリデーションエラーとなること', async () => {
    const noteKey =
      'this_is_65_characters_string_1234567890abcdefghijklmnopqrstuvwxyz';
    const response = await SELF.fetch(`http://example.com/notes/${noteKey}`);
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      code: 400,
      message: 'Validation Error',
    });
  });

  test('noteKeyがnullの時、バリデーションエラーとなること', async () => {
    const noteKey = null;
    const response = await SELF.fetch(`http://example.com/notes/${noteKey}`);
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      code: 400,
      message: 'Validation Error',
    });
  });
});

describe('Resource Not Found', () => {
  test('存在しないkeyの時、Not Foundとなること', async () => {
    const noteKey =
      'this_is_64_characters_string_but_not_exist_1234567890abcdefghijk';
    const response = await SELF.fetch(`http://example.com/notes/${noteKey}`);
    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({
      code: 404,
      message: 'Not Found',
    });
  });

  test('noteKeyが空のStringの時、Not Foundとなること', async () => {
    const noteKey = '';
    const response = await SELF.fetch(`http://example.com/notes/${noteKey}`);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe('404 Not Found');
  });
});
