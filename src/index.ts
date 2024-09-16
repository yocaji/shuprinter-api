import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { apiApp } from './api';

type Bindings = {
  CORS_ORIGIN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.route('/api', apiApp);

app.use('/api/*', async (c, next) => {
  return cors({
    origin: c.env.CORS_ORIGIN,
    allowMethods: ['GET', 'POST'],
    maxAge: 86400,
  })(c, next);
});

export default app;
