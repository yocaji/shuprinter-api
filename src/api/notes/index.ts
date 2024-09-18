import { OpenAPIHono } from '@hono/zod-openapi';
import {
  createNoteRoute,
  readNoteRoute,
  readNotesRoute,
  updateNoteRoute,
} from './route';
import { getPrisma } from '../../utils/prisma';

type Bindings = {
  DATABASE_URL: string;
};

const noteApp = new OpenAPIHono<{ Bindings: Bindings }>();

noteApp.openapi(
  createNoteRoute,
  async (c) => {
    const { subject, content } = c.req.valid('json');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.create({
      data: { subject, content },
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
  readNotesRoute,
  async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
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
  updateNoteRoute,
  async (c) => {
    const { id } = c.req.valid('param');
    const { subject, content } = c.req.valid('json');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.update({
      where: { id },
      data: { subject, content },
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

export { noteApp };
