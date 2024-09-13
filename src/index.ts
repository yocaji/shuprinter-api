import { Env, Hono } from 'hono';
import { cors } from 'hono/cors';
import { getPrisma } from './prismaFunction';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    CORS_ORIGIN: string;
  };
}>() satisfies ExportedHandler<Env>;

app.use('/*', async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.CORS_ORIGIN,
    allowMethods: ['GET', 'POST'],
    maxAge: 86400,
  });
  return corsMiddlewareHandler(c, next);
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/notes/:key', async (c) => {
  const { key } = c.req.param();
  const prisma = getPrisma(c.env.DATABASE_URL);
  const note = await prisma.note.findFirst({
    where: {
      key: key,
    },
  });
  return c.json(note);
});

app.post('/notes/create', async (c) => {
  const { subject, key } = await c.req.json();

  const prisma = getPrisma(c.env.DATABASE_URL);
  const note = await prisma.note.create({
    data: {
      subject: subject,
      key: key,
    },
  });
  return c.json(note);
});
export default app;
