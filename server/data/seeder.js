import connectDB from '../config/db.js';
// Import dummy data
import users from './users.js';
import restaurants from './restaurants.js';

// Import models
import User from '../models/userModel.js';
import Restaurant from '../models/restaurantModel.js';

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Restaurant.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;

    const sampleRestaurants = restaurants.map(restaurant => {
      return { ...restaurant, user: adminUser };
    });

    await Restaurant.insertMany(sampleRestaurants);

    console.log('Data Imported.');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
