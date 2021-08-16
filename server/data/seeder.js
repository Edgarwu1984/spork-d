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
    // Delete Existing Data
    await User.deleteMany();
    await Restaurant.deleteMany();

    // Add New Data
    await User.insertMany(users);
    await Restaurant.insertMany(restaurants);

    console.log('Data Imported.');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
