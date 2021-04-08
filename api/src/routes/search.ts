import express from 'express';
import axios from 'axios';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

const createResults = (data: any) => {
  return data.features.map((feature: any) => {
    return {
      name: feature.properties.geocoding.name,
      coordinates: feature.geometry.coordinates,
    };
  });
};

router.get('/api/search', async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=geocodejson&limit=5`
    );
    res.send(createResults(response.data));
  } catch (err) {
    throw new BadRequestError(`Can't search for that query`);
  }
});

export { router as searchRouter };
