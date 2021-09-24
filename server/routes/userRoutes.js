const express = require('express');
const {
  loginUser,
  registerUser,
  getUserById,
  getUsers,
  deleteUserById,
  getUserProfile,
  updateUserProfile,
  getUserReviews,
} = require('../controllers/userControllers');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  registerValidation,
  loginValidation,
} = require('../policies/authPolicy');
const userValidation = require('../policies/userPolicy');

const router = express.Router();

// Route '/api/users'
// USER
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(userValidation, protect, updateUserProfile);
router.route('/profile/reviews').get(protect, getUserReviews);
router.route('/login').post(loginValidation, loginUser);
router.route('/register').post(registerValidation, registerUser);
// ADMIN
router.route('/').get(protect, isAdmin, getUsers);
router.route('/:id').get(getUserById).delete(deleteUserById);

module.exports = router;
