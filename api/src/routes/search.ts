import express, { Request, Response } from 'express';
import axios from 'axios';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { query } from 'express-validator';
import { NotFoundError } from '../errors/not-found-error';

const router = express.Router();

const createResults = (data: any) => {
  return data.features.map((feature: any) => {
    return {
      name: feature.properties.geocoding.name,
      coordinates: feature.geometry.coordinates,
    };
  });
};

router.get(
  '/api/search',
  [query('q').notEmpty().withMessage('You must enter a value')],
  validateRequest,
  async (req: Request, res: Response) => {
    const searchQuery = req.query.q;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${searchQuery}&format=geocodejson&limit=5`
      );
      if (response.status === 200) {
        res.send(createResults(response.data));
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      throw new BadRequestError(`Can't search for that query`);
    }
  }
);

export { router as searchRouter };
