const { db } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const hashPassword = require('../utils/hashPassword');
const matchPassword = require('../utils/matchPasswordCheck');
const generateToken = require('../utils/tokenGenerator');

/* ============================ USER CONTROLLERS ============================ */
// @description Register User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = {
    username: username,
    photo: '/images/user_picture.jpg',
    email: email,
    password: await hashPassword(password),
    isAdmin: false,
    isActivated: true,
  };
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();

  const isExist = snapshot.docs.some(
    doc => doc.data().email === req.body.email
  );

  if (isExist) {
    res.status(400);
    throw new Error('Email already in use.');
  } else if (user) {
    const token = generateToken(user.id);
    const newUser = await usersRef.add({ ...user, token: token });
    const doc = await usersRef.doc(newUser.id).get();
    const data = { id: doc.id, ...doc.data() };

    res.json({
      status: 'Register Success',
      data: data,
    });
  }
});

// @description Login User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const usersRef = db.collection('users').where('email', '=', email);
  const snapshot = await usersRef.get();
  const user = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))[0];

  if (await matchPassword(password, user.password)) {
    if (!user.isActivated) {
      res.status(404);
      throw new Error('User does not exist.');
    } else {
      const token = generateToken(user.id);
      res.status(201).json({
        status: 'Login Success',
        data: { ...user, token: token },
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @description Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const userRef = db.collection('users').doc(req.user);
  const doc = await userRef.get();
  const data = { id: doc.id, ...doc.data() };
  if (!doc.exists) {
    res.status(400);
    throw new Error('No user found.');
  } else {
    res.status(200).json({
      status: 'success',
      data,
    });
  }
});

// @description Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userRef = db.collection('users').doc(req.user);
  const doc = await userRef.get();
  const user = { id: doc.id, ...doc.data() };

  await userRef.update({
    username: req.body.username || user.username,
    email: req.body.email || user.email,
    password: (await hashPassword(req.body.password)) || user.password,
    photo: req.body.photo || user.photo,
    updatedAt: Date.now(),
  });

  const updatedDoc = await userRef.get();
  const updatedUser = { id: updatedDoc.id, ...updatedDoc.data() };

  res.status(200).json({
    status: 'success',
    message: 'User updated.',
    data: updatedUser,
  });
});

// @description Get user reviews
// @route GET /api/users/profile/reviews
// @access Private
const getUserReviews = asyncHandler(async (req, res) => {
  const userRef = db.collection('users').doc(req.user);
  const doc = await userRef.get();
  const data = { ...doc.data() };
  // const reviews = data.reviews.map(r => r.data());
  console.log(data);
});

/* ============================ ADMIN CONTROLLERS ============================ */
// @description Get all Users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (snapshot.empty) {
    res.status(400);
    throw new Error('No users');
  } else {
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    });
  }
});

// @description Get all User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
  const snapshot = await db.collection('users').doc(req.params.id).get();

  try {
    const id = snapshot.id;
    const data = snapshot.data();
    if (id && data) {
      res.status(200).json({ id, ...data });
    } else {
      res.status(400).send({ message: 'User Not Found.' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// @description Delete all User by ID
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUserById = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUserReviews,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUserById,
};
