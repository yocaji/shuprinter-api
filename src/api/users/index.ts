import { OpenAPIHono } from '@hono/zod-openapi';
import { readUserNotesRoute } from './route';
import { getPrisma } from '../../utils/prisma';

type Bindings = {
  DATABASE_URL: string;
};

const userApp = new OpenAPIHono<{ Bindings: Bindings }>();

userApp.openapi(
  readUserNotesRoute,
  async (c) => {
    const { id } = c.req.valid('param');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const note = await prisma.note.findMany({
      where: { userId: id },
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

export { userApp };
