import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @description Fetch all Users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('Users not found.');
  }
});

// @description Fetch all User by ID
// @route GET /api/users/:id
// @access Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

export { getUsers, getUserById };
