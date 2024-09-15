import { createRoute } from '@hono/zod-openapi';
import {
  WelcomeSchema,
  NoteParamsSchema,
  NoteSchema,
  ErrorSchema,
} from './schema';

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

export const createNoteRoute = createRoute({
  method: 'post',
  path: '/notes/create',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: NoteSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: NoteSchema,
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

export const noteRoute = createRoute({
  method: 'get',
  path: '/notes/{noteKey}',
  request: {
    params: NoteParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: NoteSchema,
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
