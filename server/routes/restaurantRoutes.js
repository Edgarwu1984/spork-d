const express = require('express');
const {
  getRestaurantReviews,
  getRestaurants,
  getRestaurantsById,
} = require('../controllers/restaurantControllers');

const router = express.Router();

router.route('/').get(getRestaurants);
router.route('/:id').get(getRestaurantsById);
router.route('/:id/reviews').get(getRestaurantReviews);

module.exports = router;
