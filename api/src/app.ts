import 'dotenv/config';
import express from 'express';
import config from './config';
import './db';
import errorHandling from './error-handling';
import routes from './routes';

const app = express();
config(app);

app.use('/api', routes);

errorHandling(app);

export default app;
