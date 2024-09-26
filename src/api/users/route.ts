import { createRoute } from '@hono/zod-openapi';
import { responseNoteSchema } from '../notes/schema';
import { userNotesDeletedResponseSchema, userParamsSchema } from './schema';
import { ErrorSchema } from '../common/schema';

const errorContent = {
  content: {
    'application/json': {
      schema: ErrorSchema,
    },
  },
  description: 'Bad Request',
};

export const readUserNotesRoute = createRoute({
  method: 'get',
  path: '/{id}/notes',
  request: {
    params: userParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: responseNoteSchema,
        },
      },
      description: "Get user's notes",
    },
    400: { errorContent, description: 'Bad Request' },
    404: { errorContent, description: 'Not Found' },
  },
});

export const deleteUserNotesRoute = createRoute({
  method: 'delete',
  path: '/{id}/notes',
  request: {
    params: userParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: userNotesDeletedResponseSchema,
        },
      },
      description: "Delete user's notes",
    },
    400: { errorContent, description: 'Bad Request' },
    404: { errorContent, description: 'Not Found' },
  },
});
