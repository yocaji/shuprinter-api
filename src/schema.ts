import { z } from '@hono/zod-openapi';

export const WelcomeSchema = z.object({
  message: z.string().openapi({
    example: 'Hi!',
  }),
});

export const NoteSchema = z
  .object({
    noteKey: z.string().openapi({
      example:
        'b975ceeb58c2bb1d9bdf6162c64c5e2dde2b3493397ceb85841ab50714653a38',
    }),
    subject: z.string().openapi({
      example: 'About SprintPost',
    }),
    content: z.string().openapi({
      example: '1. Write a note\n2. Share the note\n3. Done!',
    }),
  })
  .openapi('Note');

export const NoteParamsSchema = z.object({
  noteKey: z
    .string()
    .min(64)
    .openapi({
      param: {
        name: 'noteKey',
        in: 'path',
        required: true,
      },
      example:
        'b975ceeb58c2bb1d9bdf6162c64c5e2dde2b3493397ceb85841ab50714653a38',
    }),
});

export const ErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: 'Bad Request',
  }),
});
