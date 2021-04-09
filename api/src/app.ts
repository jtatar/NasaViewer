import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { getEarthRouter } from './routes/earth';
import { searchRouter } from './routes/search';

const frontUrl = process.env.FRONT_URL || 'http://localhost:3000';

const app = express();
app.set('trust proxy', true);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', `${frontUrl}`);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(getEarthRouter);
app.use(searchRouter);
app.use(errorHandler);

export { app };
