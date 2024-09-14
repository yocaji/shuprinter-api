import { getPrisma } from './prismaFunction';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { welcomeRoute, noteRoute, createNoteRoute } from './route';

type Bindings = {
  DATABASE_URL: string;
  CORS_ORIGIN: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.use('/*', async (c, next) => {
  return cors({
    origin: c.env.CORS_ORIGIN,
    allowMethods: ['GET', 'POST'],
    maxAge: 86400,
  })(c, next);
});

app.openapi(welcomeRoute, (c) => {
  return c.json({ message: 'Welcome to SprintPost!' }, 200);
});

app.openapi(
  noteRoute,
  async (c) => {
    const { noteKey } = c.req.valid('param');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.findFirst({
      select: {
        noteKey: true,
        subject: true,
        content: true,
      },
      where: {
        noteKey,
      },
    });
    return note
      ? c.json(note, 200)
      : c.json({ code: 404, message: 'Not Found' }, 404);
  },
  (result, c) => {
    return c.json({ code: 400, message: 'Validation Error' }, 400);
  },
);

app.openapi(
  createNoteRoute,
  async (c) => {
    const { noteKey, subject, content } = c.req.valid('json');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.create({
      data: {
        noteKey,
        subject,
        content,
      },
    });
    return note
      ? c.json(note, 201)
      : c.json({ code: 400, message: 'Bad Request' }, 400);
  },
  (result, c) => {
    return c.json({ code: 400, message: 'Validation Error' }, 400);
  },
);

app.doc31('/doc', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'SprintPost API',
  },
});

export default app;
