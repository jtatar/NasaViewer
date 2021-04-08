import { app } from './app';
import * as dotenv from 'dotenv';

const start = () => {
  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }
  if (!process.env.NASA_API_KEY) {
    throw new Error('NASA_API_KEY must be defined');
  }
  console.log(process.env.NASA_API_KEY);
  app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  });
};

dotenv.config({ path: __dirname + '/.env' });
start();
