import express from 'express';
import {
  createRestaurantReview,
  getRestaurants,
  getRestaurantsByID,
} from '../controllers/restaurantControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getRestaurants);
router.route('/:id').get(getRestaurantsByID);
router.route('/:id/reviews').put(protect, createRestaurantReview);

export default router;
