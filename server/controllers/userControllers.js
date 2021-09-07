const { db, auth } = require('../config/db');

/* ============================ USER CONTROLLERS ============================ */
const registerUser = async (req, res) => {
  try {
    const { username, photo, email, password } = req.body;
    const authData = await auth.createUser({ email, password });
    const userData = await db.collection('users').doc(authData.user.uid).set({
      username,
      photo,
    });

    if (authData) {
      res.status(201).json(authData);
      res.status(201).json(userData);
    } else {
      res.status(400).send({ message: 'Error, not valid email or password' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authData = await auth.getUser({ email, password });
    const uid = authData.user.uid;
    const userDoc = await db.collection('users').doc(uid).get();
    const userData = { uid, ...userDoc.data() };

    if (authData) {
      res.status(201).json({ ...authData, userData });
    } else {
      res.status(400).send({ message: 'Error, not valid email or password' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

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
