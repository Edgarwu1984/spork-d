import express from 'express';

import {
  loginUser,
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

export default router;
