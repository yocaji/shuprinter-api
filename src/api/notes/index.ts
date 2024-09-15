import { OpenAPIHono } from '@hono/zod-openapi';
import { noteRoute, createNoteRoute } from './route';
import { getPrisma } from '../../utils/prisma';

type Bindings = {
  DATABASE_URL: string;
};

const noteApp = new OpenAPIHono<{ Bindings: Bindings }>();

noteApp.openapi(
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
    if (!result.success) {
      return c.json({ code: 400, message: 'Validation Error' }, 400);
    }
  },
);

noteApp.openapi(
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
      : c.json({ code: 404, message: 'Not Found' }, 404);
  },
  (result, c) => {
    if (!result.success) {
      return c.json({ code: 400, message: 'Validation Error' }, 400);
    }
  },
);

export { noteApp };
