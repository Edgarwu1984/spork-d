const { db } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { validateFile } = require('../utils/fileServices');

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurantsRef = db.collection('restaurants');

  const keyword = req.query.search;

  const snapshot = keyword
    ? await restaurantsRef
        .orderBy('name')
        .where('name', '>=', keyword.toUpperCase())
        .where('name', '<=', keyword.toLowerCase() + '\uf8ff')
        .get()
    : await restaurantsRef.get();

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (snapshot.empty) {
    return next(ApiError.badRequest('No restaurant be found.'));
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
const getTopRestaurants = asyncHandler(async (req, res, next) => {
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
    return next(ApiError.badRequest('No Top restaurant be found.'));
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
const getRestaurantsByCategory = asyncHandler(async (req, res, next) => {
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
    return next(
      ApiError.badRequest(
        `No restaurants be found with ${req.params.category} category.`
      )
    );
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
const getRestaurantsById = asyncHandler(async (req, res, next) => {
  const restaurantsRef = db.collection('restaurants').doc(req.params.id);
  const doc = await restaurantsRef.get();
  // Get doc ID & And attach to the Object
  const data = { id: doc.id, ...doc.data() };

  if (!doc.exists) {
    return next(ApiError.badRequest('No restaurant be found.'));
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
const getRestaurantReviews = asyncHandler(async (req, res, next) => {
  const reviewsRef = db
    .collection('reviews')
    .where('restaurantId', '==', req.params.id)
    .orderBy('createdAt', 'desc');

  const snapshot = await reviewsRef.get();

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (snapshot.empty) {
    return next(ApiError.badRequest('No reviews be found.'));
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
const createRestaurantReview = asyncHandler(async (req, res, next) => {
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
  const reviewsRef = db.collection('reviews');

  // Check whether User ID in Current Restaurant Review List
  const currentReviewDoc = await reviewsRef
    .where('restaurantId', '==', req.params.id)
    .get();

  const isExist = currentReviewDoc.docs.some(
    doc => doc.data().user.id === req.user
  );
  if (isExist) {
    return next(ApiError.badRequest('You have already reviewed.'));
  } else {
    // Update Restaurant numReviews & totalRating & rating
    await restaurantRef.update({
      numReviews: (restaurant.numReviews += 1),
      totalRating: (restaurant.totalRating += rating),
      rating: restaurant.totalRating / restaurant.numReviews,
    });

    const newReview = {
      user: {
        id: req.user,
        username: user.username,
        photo: user.photo,
      },
      restaurantId: req.params.id,
      restaurantName: restaurant.name,
      restaurantCategory: restaurant.category,
      restaurantCoverImage: restaurant.coverImage,
      rating: rating,
      comment: comment,
      createdAt: Date.now(),
    };

    // Add Review
    await reviewsRef.add(newReview);

    res.status(201).json({
      status: 'success',
      message: 'Review added.',
    });
  }
});

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const createRestaurant = asyncHandler(async (req, res, next) => {
  // File Validation
  let fileFormatError = validateFile(req.files, 1000000);
  if (fileFormatError) {
    console.log(fileFormatError);
    return next(
      ApiError.badRequest(
        `Your image does not meet requirements - ${fileFormatError.message}`
      )
    );
  }

  // Sever Upload
  let coverImageDownloadURL = '';
  let menuImageDownloadURL = '';
  if (req.files) {
    const fileName = fileServerUploader(req.files.coverImage);
    coverImageDownloadURL = await storageBucketUploader('restaurant', fileName);
  }

  const restaurant = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    address: {
      street: req.body.address.street,
      suburb: req.body.address.suburb,
      postcode: req.body.address.postcode,
      state: req.body.address.state,
    },
    openHour: req.body.openHour,
    phoneNumber: req.body.phoneNumber,
    rating: 5,
    numReviews: 0,
    totalRating: 0,
    avgPrice: Number(req.body.avgPrice),
    geolocation: req.body.geolocation,
    info: req.body.info,
    menu: req.body.menu,
    coverImage: coverImageDownloadURL,
  };

  const restaurantsRef = db.collection('restaurants');
  const response = await restaurantsRef.add(restaurant);

  res.status(200).json({
    status: 'success',
    data: response.id,
  });
});

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantsById,
  getRestaurantsByCategory,
  getRestaurantReviews,
  getTopRestaurants,
  createRestaurantReview,
};
