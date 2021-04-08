import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { getEarthRouter } from './routes/earth';
import { searchRouter } from './routes/search';

const app = express();

app.use(getEarthRouter);
app.use(searchRouter);
app.use(errorHandler);

export { app };
