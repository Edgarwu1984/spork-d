const express = require('express');
const {
  getRestaurantReviews,
  getRestaurants,
  getRestaurantsById,
  getTopRestaurants,
  getRestaurantsByCategory,
} = require('../controllers/restaurantControllers');

const router = express.Router();

// Route '/api/restaurants'
router.route('/').get(getRestaurants);
router.route('/top').get(getTopRestaurants);
router.route('/:category').get(getRestaurantsByCategory);
router.route('/:category/:id').get(getRestaurantsById);
router.route('/:category/:id/reviews').get(getRestaurantReviews);

module.exports = router;
