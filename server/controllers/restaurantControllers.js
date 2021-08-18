import { Restaurants } from '../config/index.js';

// @description Fetch all Restaurants
// @route GET /api/restaurants
// @access Public
const getRestaurants = async (req, res) => {
  const snapshot = await Restaurants.get();
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
  const snapshot = await Restaurants.doc(req.params.id).get();

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

export { getRestaurants, getRestaurantsById };
