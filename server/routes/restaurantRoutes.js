import express from 'express';
import {
  createRestaurantReview,
  getRestaurants,
  getRestaurantsByID,
} from '../controllers/restaurantControllers.js';

const router = express.Router();

router.route('/').get(getRestaurants);
router.route('/:id').get(getRestaurantsByID);
router.route('/:id/reviews').put(createRestaurantReview);

export default router;
