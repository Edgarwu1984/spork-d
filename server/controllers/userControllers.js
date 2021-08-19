import { Users, Auth } from '../config/index.js';
import Joi from 'joi';

/* ============================ USER CONTROLLERS ============================ */
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authData = await Auth.createUserWithEmailAndPassword(email, password);

    if (authData) {
      res.status(201).send(authData);
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
    const authData = await Auth.signInWithEmailAndPassword(email, password);
    if (authData) {
      res.status(200).send(authData);
    } else {
      res.status(400).send({ message: 'Error, not valid email or password' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    await Auth.signOut();
    res.status(200).send({ message: 'sign out.' });
  } catch (error) {
    res.status(400).send(error);
  }
};

/* ============================ ADMIN CONTROLLERS ============================ */
// @description Get all Users
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
  const snapshot = await Users.get();
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
  const snapshot = await Users.doc(req.params.id).get();

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

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  deleteUserById,
};
