import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getPrisma } from './prismaFunction';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    CORS_ORIGIN: string;
  };
}>();

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
  const note = await prisma.sprint.findFirst({
    where: {
      hash: key,
    },
  });
  return c.json(note);
});

app.post('/notes/create', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const sprint = await prisma.sprint.create({
    data: {
      subject: 'Alice is a friend of mine',
      content: 'She is a good friend, and I like her a lot.',
      hash: 'alice-friend',
    },
  });
  console.log(sprint);
});
export default app;
