import { z } from '@hono/zod-openapi';

const userId = {
  id: z.string().length(28).openapi({
    example: 'S0RAA7Fk1TzcK2qPtET6b1oW4JjQ',
  }),
};

export const userParamsSchema = z.object({
  ...userId,
});
