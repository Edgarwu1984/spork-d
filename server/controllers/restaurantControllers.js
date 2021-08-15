import asyncHandler from 'express-async-handler';
import Restaurant from '../models/restaurantModel.js';

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();

  if (restaurants) {
    res.json(restaurants);
  } else {
    res.status(404);
    throw new Error('Restaurants not Found.');
  }
});

// @description Fetch all Restaurants by ID
// @route GET /api/restaurants/:id
// @access Public
const getRestaurantsByID = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404);
    throw new Error('Restaurant not Found.');
  }
});

// @description Create new review
// @route PUT /api/restaurants/:id/reviews
// @access Private
const createRestaurantReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    const alreadyReviewed = restaurant.reviews.find(
      review => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error('Restaurant already reviewed.');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user.id,
    };

    // Add new review to restaurant reviews
    restaurant.reviews.push(review);
    // Update numReviews
    restaurant.numReviews = product.reviews.length;
    // Calculate rating (Total rating / numReviews)
    restaurant.rating =
      restaurant.reviews.reduce((acc, item) => item.rating + acc, 0) /
      restaurant.reviews.length;

    await restaurant.save();
    res.status(201).json({ message: 'New reviews added.' });
  } else {
    res.status(404);
    throw new Error('Restaurant not found.');
  }
});

export { getRestaurants, getRestaurantsByID, createRestaurantReview };
