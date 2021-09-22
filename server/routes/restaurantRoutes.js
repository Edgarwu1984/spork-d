const express = require('express');
const {
  getRestaurantReviews,
  getRestaurants,
  getRestaurantsById,
  getTopRestaurants,
  getRestaurantsByCategory,
  createRestaurantReview,
} = require('../controllers/restaurantControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route '/api/restaurants'
router.route('/').get(getRestaurants);
router.route('/top').get(getTopRestaurants);
router.route('/:category').get(getRestaurantsByCategory);
router.route('/:category/:id').get(getRestaurantsById);
router
  .route('/:category/:id/reviews')
  .get(getRestaurantReviews)
  .post(protect, createRestaurantReview);

module.exports = router;
