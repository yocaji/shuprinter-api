import { Hono } from 'hono';
import { getPrisma } from './prismaFunction';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/sprint/create', async (c) => {
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
