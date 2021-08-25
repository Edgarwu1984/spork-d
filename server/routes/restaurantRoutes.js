import express from 'express';
import {
  getRestaurantReviews,
  getRestaurants,
  getRestaurantsById,
} from '../controllers/restaurantControllers.js';

const router = express.Router();

router.route('/').get(getRestaurants);
router.route('/:id').get(getRestaurantsById);
router.route('/:id/reviews').get(getRestaurantReviews);

export default router;
