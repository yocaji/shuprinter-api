import { OpenAPIHono } from '@hono/zod-openapi';
import { readNoteRoute, upsertNoteRoute, deleteNoteRoute } from './route';
import { getPrisma } from '../../utils/prisma';

type Bindings = {
  DATABASE_URL: string;
};

const noteApp = new OpenAPIHono<{ Bindings: Bindings }>();

noteApp.openapi(
  readNoteRoute,
  async (c) => {
    const { id } = c.req.valid('param');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.findUnique({
      where: { id },
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
  upsertNoteRoute,
  async (c) => {
    const { id } = c.req.valid('param');
    const { subject, content, userId } = c.req.valid('json');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.upsert({
      where: { id },
      create: { id, subject, content, userId },
      update: { subject, content },
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
  deleteNoteRoute,
  async (c) => {
    const { id } = c.req.valid('param');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const response = await prisma.note.delete({
      where: { id },
    });
    return response
      ? c.json(response, 200)
      : c.json({ code: 404, message: 'Not Found' }, 404);
  },
  (result, c) => {
    if (!result.success) {
      return c.json({ code: 400, message: 'Validation Error' }, 400);
    }
  },
);

export { noteApp };
