const { db } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const getRestaurants = asyncHandler(async (req, res) => {
  const doc = db.collection('restaurants');
  const restaurants = await doc.get();
  const data = restaurants.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.empty) {
    res.status(200).send({ message: 'No restaurants.' });
  } else {
    res.status(200).json({
      status: 'success',
      result: data.length,
      data,
    });
  }
});

// @description Get Top 4 Restaurants
// @route GET /api/restaurants/top
// @access Public
const getTopRestaurants = asyncHandler(async (req, res) => {
  const doc = db.collection('restaurants');
  const restaurants = await doc
    .where('rating', '>=', 4.6)
    .orderBy('rating', 'desc')
    .limit(4)
    .get();

  const data = restaurants.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.empty) {
    res.status(200).send({ message: 'No top restaurants found.' });
  } else {
    res.status(200).json({
      status: 'success',
      result: data.length,
      data,
    });
  }
});

// @description Get Restaurants By Category
// @route GET /api/restaurants/:category
// @access Public
const getRestaurantsByCategory = asyncHandler(async (req, res) => {
  const doc = db.collection('restaurants');
  const restaurants = await doc
    .where('category', '==', req.params.category)
    .get();

  const data = restaurants.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.empty) {
    res.status(200).send({ message: 'No restaurants.' });
  } else {
    res.status(200).json({
      status: 'success',
      result: data.length,
      data,
    });
  }
});

// @description Fetch all Restaurants by ID
// @route GET /api/restaurants/:id
// @access Public
const getRestaurantsById = asyncHandler(async (req, res) => {
  const doc = db.collection('restaurants');
  const restaurant = await doc.doc(req.params.id).get();
  // Get ID & Data separately in order to store them in one object
  const id = restaurant.id;
  const data = restaurant.data();
  if (!id || !data) {
    res.status(404);
    throw new Error('No restaurant found.');
  } else {
    res.status(200).json({
      status: 'success',
      data: { id, ...data },
    });
  }
});

// @description Get Restaurant Reviews
// @route GET /api/restaurants/:category/:id/reviews
// @access Public
const getRestaurantReviews = asyncHandler(async (req, res) => {
  const data = await db
    .collection('restaurants')
    .doc(req.params.id)
    .collection('reviews')
    .get();

  if (data.empty) {
    res.status(200).send({ message: 'No reviews.' });
  } else {
    const reviews = data.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send({
      status: 'success',
      result: reviews.length,
      data: reviews,
    });
  }
});

// @description Create Restaurant Review
// @route POST /api/restaurants/:id/reviews
// @access Private
// const createRestaurantReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const uid = Auth.onAuthStateChanged(user => {
//       return user.uid;
//     });
//     const snapshot = await Restaurants.doc(req.params.id).get();
//     const data = snapshot.data();

//     const reviews = [{ uid, rating, comment }];

//     await Restaurants.doc(req.params.id).update(data, reviews);
//     res.status(200).send('Review has been added');
//   } catch (error) {
//     res.status(400).send('An error occurred. ' + error);
//   }
// };

module.exports = {
  getRestaurants,
  getRestaurantsById,
  getRestaurantsByCategory,
  getRestaurantReviews,
  getTopRestaurants,
  // createRestaurantReview,
};
