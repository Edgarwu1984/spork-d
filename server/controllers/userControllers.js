import asyncHandler from 'express-async-handler';
import generateToken from '../utils/tokenGenerator.js';
import User from '../models/userModel.js';

/* ============================ USER CONTROLLERS ============================ */
// @description Login user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  // Check if user password match with request;
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password. Please check and try again.');
  }
});

// @description Register a User
// @route GET /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, picture } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error('User already exist.');
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    picture: picture,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      picture: user.picture,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// @description Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      picture: user.picture,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @description Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // Get request body, if it not exist, keep the current data.
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.picture = req.body.picture || user.picture;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      password: updatedUser.password,
      picture: updatedUser.picture,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/* ============================ ADMIN CONTROLLERS ============================ */
// @description Get all Users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('Users not found.');
  }
});

// @description Get all User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @description Delete all User by ID
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User deleted.' });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUserById,
};
