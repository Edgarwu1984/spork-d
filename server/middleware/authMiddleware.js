const { db } = require('../config/db');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Only get token without 'Bearer'
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await decoded.id;

    next();
  }

  if (!token) {
    return next(ApiError.notAuthRequest('Not authorized, invalid token.'));
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const userRef = db.collection('users').doc(req.user);
  const doc = await userRef.get();
  const user = { id: doc.id, ...doc.data() };
  if (doc.exists && user.isAdmin) {
    next();
  } else {
    return next(ApiError.notAuthRequest('Not authorized user account.'));
  }
});

module.exports = { protect, isAdmin };
