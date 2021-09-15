const { Users, Restaurants } = require('../config');
const users = require('../users');
const restaurants = require('./restaurants');

const seeder = () => {
  Restaurants.doc()
    .set(restaurants)
    .then(() => {
      console.log('Restaurant document successfully written!');
    });
  Users.doc()
    .set(users)
    .then(() => {
      console.log('User document successfully written!');
    });
  process.exit();
};

seeder();
