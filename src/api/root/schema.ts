import { z } from '@hono/zod-openapi';

export const WelcomeSchema = z.object({
  message: z.string().openapi({
    example: 'Hi!',
  }),
});
