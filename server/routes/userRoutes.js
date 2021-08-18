import express from 'express';

import {
  getUserById,
  getUsers,
  deleteUserById,
} from '../controllers/userControllers.js';

const router = express.Router();

router.route('/').get(getUsers);

router.route('/:id').get(getUserById).delete(deleteUserById);

export default router;
