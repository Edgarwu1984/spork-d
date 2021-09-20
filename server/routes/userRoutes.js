const express = require('express');
const {
  loginUser,
  registerUser,
  getUserById,
  getUsers,
  deleteUserById,
} = require('../controllers/userControllers');
const {
  registerValidation,
  loginValidation,
} = require('../policies/authPolicy');

const router = express.Router();

// Route '/api/users'
router.route('/').get(getUsers);
router.route('/:id').get(getUserById).delete(deleteUserById);
router.route('/login').post(loginValidation, loginUser);
router.route('/register').post(registerValidation, registerUser);

module.exports = router;
