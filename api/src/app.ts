import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { getEarthRouter } from './routes/earth';

const app = express();

app.use(getEarthRouter);
app.use(errorHandler);

export { app };
