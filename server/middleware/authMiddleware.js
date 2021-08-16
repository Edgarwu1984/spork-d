import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Only get token, except the "Bearer"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password'); // Only request get user, except user password
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, invalid token.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, invalid token.');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized user account.');
  }
};

export { protect, isAdmin };
