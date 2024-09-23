import { createRoute } from '@hono/zod-openapi';
import {
  upsertNoteBodySchema,
  responseNoteSchema,
  getNoteParamsSchema,
} from './schema';
import { ErrorSchema } from '../common/schema';

const errorContent = {
  content: {
    'application/json': {
      schema: ErrorSchema,
    },
  },
  description: 'Bad Request',
};

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
      description: 'Retrieve a note by noteKey',
    },
    400: { errorContent, description: 'Bad Request' },
    404: { errorContent, description: 'Not Found' },
  },
});

export const readNotesRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: responseNoteSchema,
        },
      },
      description: 'Get notes by user',
    },
    400: { errorContent, description: 'Bad Request' },
    404: { errorContent, description: 'Not Found' },
  },
});

export const upsertNoteRoute = createRoute({
  method: 'put',
  path: '/{id}',
  request: {
    params: getNoteParamsSchema,
    body: {
      required: true,
      content: {
        'application/json': {
          schema: upsertNoteBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: responseNoteSchema,
        },
      },
      description: 'Retrieve a note by noteKey',
    },
    400: { errorContent, description: 'Bad Request' },
    404: { errorContent, description: 'Not Found' },
  },
});

export const deleteNoteRoute = createRoute({
  method: 'delete',
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
      description: 'Delete a note by noteKey',
    },
    400: { errorContent, description: 'Bad Request' },
    404: { errorContent, description: 'Not Found' },
  },
});
