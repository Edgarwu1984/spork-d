import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  loginUser,
  registerUser,
  getUserProfile,
  getUserById,
  getUsers,
  updateUserProfile,
  deleteUserById,
} from '../controllers/userControllers.js';

const router = express.Router();

router.route('/login').post(loginUser);

router.route('/register').post(registerUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/').get(protect, isAdmin, getUsers);

router
  .route('/:id')
  .get(protect, isAdmin, getUserById)
  .delete(protect, isAdmin, deleteUserById); // :id route must be after profile route

export default router;
