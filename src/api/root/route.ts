import { createRoute } from '@hono/zod-openapi';
import { WelcomeSchema } from './schema';

export const welcomeRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: WelcomeSchema,
        },
      },
      description: 'Hello Hono!',
    },
  },
});
