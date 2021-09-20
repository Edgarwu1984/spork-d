const { db } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const hashPassword = require('../utils/hashPassword');
const matchPassword = require('../utils/matchPasswordCheck');
const generateToken = require('../utils/tokenGenerator');

/* ============================ USER CONTROLLERS ============================ */
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
    const newUser = await usersRef.add({ ...user, token: generateToken(user) });
    res.json({
      status: 'Register Success',
      data: newUser.id,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '=', email).get();
  const user = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))[0];

  if (await matchPassword(password, user.password)) {
    if (!user.isActivated) {
      res.status(404);
      throw new Error('User does not exist.');
    } else {
      res.status(201).json({
        status: 'Login Success',
        data: { ...user, token: generateToken(user) },
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/* ============================ ADMIN CONTROLLERS ============================ */
// @description Get all Users
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
  const snapshot = await db.collection('users').get();
  try {
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).send({ messages: 'No users' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

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
  getUsers,
  getUserById,
  deleteUserById,
};
