import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { userApp } from './users';
import { noteApp } from './notes';

type Bindings = {
  CORS_ORIGIN: string;
};

const apiApp = new OpenAPIHono<{ Bindings: Bindings }>();

apiApp.use('/*', async (c, next) => {
  return cors({
    origin: c.env.CORS_ORIGIN,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    maxAge: 86400,
  })(c, next);
});

apiApp.route('/users', userApp);
apiApp.route('/notes', noteApp);

apiApp.doc('/doc', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'SprintPost API',
  },
});

apiApp.get('/ui', swaggerUI({ url: '/api/doc' }));

export { apiApp };
