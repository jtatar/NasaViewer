import express, { Request, Response } from 'express';
import axios from 'axios';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { query } from 'express-validator';

const router = express.Router();
const nasaUrl = 'https://api.nasa.gov/planetary/earth/imagery';

router.get(
  '/api/earth',
  [
    query('lon').isNumeric().notEmpty().withMessage('Longitude is required'),
    query('lat').isNumeric().notEmpty().withMessage('Latitude is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const longitude = req.query.lon;
    const latitude = req.query.lat;

    try {
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
      throw new BadRequestError('Image not found');
    }
  }
);

export { router as getEarthRouter };
