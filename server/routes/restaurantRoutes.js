import express from 'express';
import {
  getRestaurants,
  getRestaurantsById,
} from '../controllers/restaurantControllers.js';

const router = express.Router();

router.route('/').get(getRestaurants);
router.route('/:id').get(getRestaurantsById);

export default router;
