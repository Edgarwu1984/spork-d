import { Users, Restaurants } from '../config/index.js';
// import users from '../users.js';
// import restaurants from './restaurants.js';

const seeder = () => {
  Restaurants.doc()
    .set(rest)
    .then(() => {
      console.log('Document successfully written!');
      process.exit();
    });
};

seeder();
