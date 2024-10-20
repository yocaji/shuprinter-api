import { z } from '@hono/zod-openapi';

const noteInput = {
  subject: z.string().openapi({
    example: 'About SprintPost',
  }),
  content: z.string().openapi({
    example: '1. Write a note\n2. Share the note\n3. Done!',
  }),
  userId: z.string().openapi({
    example: 'S0RAA7Fk1TzcK2qPtET6b1oW4JjQ',
  }),
};
const noteGenerated = {
  createdAt: z.string().date().openapi({
    example: '2022-01-01T00:00:00Z',
  }),
  updatedAt: z.string().date().openapi({
    example: '2022-01-01T00:00:00Z',
  }),
};
const noteId = {
  id: z.string().uuid().openapi({
    example: '47fa58e4-6692-449c-b091-074f246d6ae8',
  }),
};

export const upsertNoteBodySchema = z.object({
  ...noteInput,
});

export const responseNoteSchema = z.object({
  ...noteInput,
  ...noteGenerated,
});

export const noteParamsSchema = z.object({
  ...noteId,
});
