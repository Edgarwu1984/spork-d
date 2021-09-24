const { db } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurantsRef = db.collection('restaurants');

  const keyword = req.query.search;
  if (keyword) {
    const snapshot = await restaurantsRef
      .orderBy('name')
      .where('name', '>=', keyword.toUpperCase())
      .where('name', '<=', keyword.toLowerCase() + '\uf8ff')
      .get();
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
  } else {
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
  const reviewsRef = db
    .collection('restaurants')
    .doc(req.params.id)
    .collection('reviews')
    .orderBy('createdAt', 'desc');
  const snapshot = await reviewsRef.get();

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (snapshot.empty) {
    res.status(400);
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
const createRestaurantReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  // Get Restaurant
  const restaurantRef = db.collection('restaurants').doc(req.params.id);
  const restaurantDoc = await restaurantRef.get();
  const restaurant = { id: restaurantDoc.id, ...restaurantDoc.data() };

  // Get User
  const userRef = db.collection('users').doc(req.user);
  const userDoc = await userRef.get();
  const user = { id: userDoc.id, ...userDoc.data() };

  // Get Review Ref
  const reviewsRef = db
    .collection('restaurants')
    .doc(req.params.id)
    .collection('reviews');

  // Check whether User ID in Review List
  const userSnapshot = await reviewsRef.get();
  const isExist = userSnapshot.docs.some(
    doc => doc.data().user.id === req.user
  );

  if (isExist) {
    res.status(400).json({
      message: 'You have already reviewed.',
    });
  } else {
    // Update Restaurant numReviews & totalRating & rating
    await restaurantRef.update({
      numReviews: (restaurant.numReviews += 1),
      totalRating: (restaurant.totalRating += rating),
      rating: restaurant.totalRating / restaurant.numReviews,
    });

    // Add Review
    await reviewsRef.add({
      user: {
        id: req.user,
        username: user.username,
        photo: user.photo,
      },
      rating: rating,
      comment: comment,
      createdAt: Date.now(),
    });

    res.status(201).json({
      status: 'success',
      message: 'Review added.',
    });
  }
});

module.exports = {
  getRestaurants,
  getRestaurantsById,
  getRestaurantsByCategory,
  getRestaurantReviews,
  getTopRestaurants,
  createRestaurantReview,
};
