import { Hono } from 'hono';
import { apiApp } from './api';

const app = new Hono();

app.route('/api', apiApp);

export default app;
