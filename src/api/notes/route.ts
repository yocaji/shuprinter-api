import { createRoute } from '@hono/zod-openapi';
import {
  createNoteBodySchema,
  responseNoteSchema,
  getNoteParamsSchema,
} from './schema';
import { ErrorSchema } from '../common/schema';

export const createNoteRoute = createRoute({
  method: 'post',
  path: '/new',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: createNoteBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: responseNoteSchema,
        },
      },
      description: 'Create a note',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Bad Request',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not Found',
    },
  },
});

export const readNoteRoute = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: getNoteParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: responseNoteSchema,
        },
      },
      description: 'Retrieve the note by noteKey',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Bad Request',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not Found',
    },
  },
});
