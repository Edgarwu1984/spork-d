// import { Restaurants } from '../config/index.js';
const { db } = require('../config/db');

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const getRestaurants = async (req, res) => {
  const snapshot = await db.collection('restaurants').get();
  try {
    const restaurants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (restaurants) {
      res.status(200).json(restaurants);
    } else {
      res.status(400).send({ messages: 'No restaurants' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// @description Fetch all Restaurants by ID
// @route GET /api/restaurants/:id
// @access Public
const getRestaurantsById = async (req, res) => {
  const snapshot = await db.collection('restaurants').doc(req.params.id).get();

  try {
    const id = snapshot.id;
    const data = snapshot.data();
    if (id && data) {
      res.status(200).json({ id, ...data });
    } else {
      res.status(400).send({ message: 'Restaurant Not Found' });
    }
  } catch (error) {
    res.status(400).send('An error occurred. ' + error);
  }
};

// @description Get Restaurant Reviews
// @route GET /api/restaurants/:id/reviews
// @access Public
const getRestaurantReviews = async (req, res) => {
  try {
    const snapshot = await db
      .collection('restaurants')
      .doc(req.params.id)
      .collection('reviews')
      .get();

    const reviews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!reviews) {
      res.status(400).send({ message: 'Reviews Not Found' });
    } else {
      res.status(200).send(reviews);
    }
  } catch (error) {
    res.status(400).send('An error occurred. ' + error);
  }
};

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
  // createRestaurantReview,
  getRestaurantReviews,
};
