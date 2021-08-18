import { Users } from '../config/index.js';

/* ============================ USER CONTROLLERS ============================ */

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
      res.status(400);
      throw new Error('User Not Found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// @description Delete all User by ID
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUserById = async (req, res) => {};

export { getUsers, getUserById, deleteUserById };
