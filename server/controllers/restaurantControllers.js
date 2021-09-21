const { db } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurantsRef = db.collection('restaurants');
  const snapshot = await restaurantsRef.get();
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (snapshot.empty) {
    res.status(400);
    throw new Error('No restaurants.');
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
  const restaurantsRef = db.collection('restaurants');
  const snapshot = await restaurantsRef
    .where('rating', '>=', 4.6)
    .orderBy('rating', 'desc')
    .limit(4)
    .get();

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (snapshot.empty) {
    res.status(400);
    throw new Error('No top restaurants found.');
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
  const restaurantsRef = db.collection('restaurants');
  const snapshot = await restaurantsRef
    .where('category', '==', req.params.category)
    .get();

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Another way to check category
  // const hasCategory = data.some(i => i.category === 'japanese');
  // if (!hasCategory) {
  //   res.status(400);
  //   throw new Error('No such category of restaurants be found.');
  // }

  if (snapshot.empty) {
    res.status(400);
    throw new Error('No such category of restaurants be found.');
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
  const restaurantsRef = db.collection('restaurants').doc(req.params.id);
  const doc = await restaurantsRef.get();
  // Get doc ID & And attach to the Object
  const data = { id: doc.id, ...doc.data() };

  if (!doc.exists) {
    res.status(400);
    throw new Error('No restaurant found.');
  } else {
    res.status(200).json({
      status: 'success',
      data,
    });
  }
});

// @description Get Restaurant Reviews
// @route GET /api/restaurants/:category/:id/reviews
// @access Public
const getRestaurantReviews = asyncHandler(async (req, res) => {
  const restaurantsRef = db.collection('restaurants');
  const snapshot = await restaurantsRef
    .doc(req.params.id)
    .collection('reviews')
    .get();

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (snapshot.empty) {
    res.status(200);
    throw new Error('No reviews be found.');
  } else {
    res.status(200).send({
      status: 'success',
      result: data.length,
      data,
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
