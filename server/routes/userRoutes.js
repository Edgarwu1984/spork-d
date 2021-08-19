import express from 'express';

import {
  loginUser,
  logoutUser,
  registerUser,
  getUserById,
  getUsers,
  deleteUserById,
} from '../controllers/userControllers.js';

const router = express.Router();

router.route('/').get(getUsers);

router.route('/:id').get(getUserById).delete(deleteUserById);

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').post(logoutUser);

export default router;
