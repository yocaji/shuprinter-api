import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { rootApp } from './api/root';
import { noteApp } from './api/notes';

type Bindings = {
  CORS_ORIGIN: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.route('/', rootApp);
app.route('/notes', noteApp);

app.use('/*', async (c, next) => {
  return cors({
    origin: c.env.CORS_ORIGIN,
    allowMethods: ['GET', 'POST'],
    maxAge: 86400,
  })(c, next);
});

app.doc('/doc', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'SprintPost API',
  },
});

app.get('/ui', swaggerUI({ url: '/doc' }));

export default app;
