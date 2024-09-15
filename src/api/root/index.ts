import { OpenAPIHono } from '@hono/zod-openapi';
import { welcomeRoute } from './route';

const rootApp = new OpenAPIHono();

rootApp.openapi(welcomeRoute, (c) => {
  return c.json({ message: 'Welcome to SprintPost!' }, 200);
});

export { rootApp };
