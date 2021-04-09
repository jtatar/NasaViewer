import express, { response } from 'express';
import axios from 'axios';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
const nasaUrl = 'https://api.nasa.gov/planetary/earth/imagery';

router.get('/api/earth', async (req, res) => {
  const longitude = req.query.lon;
  const latitude = req.query.lat;

  if (!longitude && !latitude) {
    throw new BadRequestError('Missing query parameters');
  }

  try {
    console.log('new request  ');
    const response = await axios.get(nasaUrl, {
      params: {
        lon: longitude,
        lat: latitude,
        api_key: process.env.NASA_API_KEY,
        date: new Date().toISOString().split('T')[0],
      },
      responseType: 'arraybuffer',
    });
    res.header(response.headers).send(response.data);
  } catch (err) {
    console.log(err);
    throw new BadRequestError('Image not found');
  }
});

export { router as getEarthRouter };
