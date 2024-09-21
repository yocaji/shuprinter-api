import { z } from '@hono/zod-openapi';

const noteInput = {
  subject: z.string().openapi({
    example: 'About SprintPost',
  }),
  content: z.string().openapi({
    example: '1. Write a note\n2. Share the note\n3. Done!',
  }),
};
const noteGenerated = {
  id: z.string().uuid().openapi({
    example: '47fa58e4-6692-449c-b091-074f246d6ae8',
  }),
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

export const createNoteBodySchema = z
  .object({
    ...noteInput,
  })
  .openapi({
    example: {
      subject: 'About SprintPost',
      content: '1. Write a note\n2. Share the note\n3. Done!',
    },
  });

export const responseNoteSchema = z
  .object({
    ...noteInput,
    ...noteGenerated,
  })
  .openapi({
    example: {
      id: '47fa58e4-6692-449c-b091-074f246d6ae8',
      subject: 'About SprintPost',
      content: '1. Write a note\n2. Share the note\n3. Done!',
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    },
  });

export const getNoteParamsSchema = z.object({
  ...noteId,
});

// export const getNoteParamsSchema = z.object({
//   id: z.string().openapi({
//     param: {
//       name: 'id',
//       in: 'path',
//       required: true,
//     },
//     example: '47fa58e4-6692-449c-b091-074f246d6ae8',
//   }),
// });
