import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { noteApp } from './notes';

const apiApp = new OpenAPIHono();

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
