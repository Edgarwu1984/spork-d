const express = require('express');
const {
  loginUser,
  registerUser,
  getUserById,
  getUsers,
  deleteUserById,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/').get(getUsers);

router.route('/:id').get(getUserById).delete(deleteUserById);

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

module.exports = router;
