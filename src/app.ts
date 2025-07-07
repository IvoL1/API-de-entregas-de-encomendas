import express from 'express';
import 'dotenv/config';
import { errorHandler } from './middlewares/error.middleware';
import { router } from './routes';

export const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);
