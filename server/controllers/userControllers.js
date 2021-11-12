const { db } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const {
  generateToken,
  hashPassword,
  matchPassword,
} = require('../utils/authServices');
const {
  storageBucketUploader,
  fileServerUploader,
  validateFile,
  getFilePathFromUrl,
  deleteFileFromBucket,
} = require('../utils/fileServices');

/* ============================ USER CONTROLLERS ============================ */
// @description Register User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = {
    username: username,
    photo:
      'https://firebasestorage.googleapis.com/v0/b/spork-s.appspot.com/o/user_picture.jpg?alt=media&token=61cd302a-583c-4b48-9c4d-1e4ac35e5d00',
    email: email,
    password: await hashPassword(password),
    isAdmin: false,
    isActivated: true,
    updatedAt: null,
  };
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();

  const isExist = snapshot.docs.some(doc => doc.data().email === email);

  if (isExist) {
    return next(ApiError.badRequest('Email already in use.'));
  } else if (user) {
    const newUser = await usersRef.add(user);
    const doc = await usersRef.doc(newUser.id).get();
    const token = generateToken(doc.id);
    const data = { id: doc.id, token: token, ...doc.data() };

    res.json({
      status: 'Register Success',
      data: {
        id: data.id,
        username: data.username,
        email: data.email,
        photo: data.photo,
        isAdmin: data.isAdmin,
        isActivated: data.isActivated,
        updatedAt: data.updatedAt,
        token: data.token,
      },
    });
  }
});

// @description Login User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const usersRef = db.collection('users').where('email', '=', email);
  const snapshot = await usersRef.get();
  const user = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))[0];

  if (!user || !(await matchPassword(password, user.password))) {
    return next(ApiError.notAuthRequest('Invalid email or password'));
  } else {
    if (!user.isActivated) {
      return next(ApiError.badRequest('User does not exist.'));
    } else {
      const token = generateToken(user.id);
      res.status(201).json({
        status: 'Login Success',
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          photo: user.photo,
          isAdmin: user.isAdmin,
          isActivated: user.isActivated,
          updatedAt: user.updatedAt,
          token: token,
        },
      });
    }
  }
});

// @description Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const userRef = db.collection('users').doc(req.user);
  const doc = await userRef.get();
  const user = { id: doc.id, ...doc.data() };

  if (!doc.exists) {
    return next(ApiError.badRequest('User does not exist.'));
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        isAdmin: user.isAdmin,
        isActivated: user.isActivated,
        updatedAt: user.updatedAt,
        token: user.token,
      },
    });
  }
});

// @description Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const userRef = db.collection('users').doc(req.user);
  const doc = await userRef.get();
  const user = { id: doc.id, ...doc.data() };

  let fileFormatError = validateFile(req.files, 1000000);
  if (fileFormatError) {
    console.log(fileFormatError);
    return next(
      ApiError.badRequest(
        `Your image does not meet requirements - ${fileFormatError.message}`
      )
    );
  }

  // Sever Upload
  let downloadURL = '';
  if (req.files) {
    const fileName = fileServerUploader(req.files.photo);
    downloadURL = await storageBucketUploader(fileName);
  }

  // Delete the previous image in bucket
  if (downloadURL) {
    const oldUrl = user.photo;
    const filePath = getFilePathFromUrl(oldUrl);
    await deleteFileFromBucket(filePath);
  }

  // Form Data
  const username = req.body.username || user.username;
  const email = req.body.email || user.email;
  const password =
    (req.body.password && (await hashPassword(req.body.password))) ||
    user.password;
  const photo = downloadURL || user.photo;

  await userRef.update({
    username,
    email,
    password,
    photo,
    updatedAt: Date.now(),
    token: generateToken(user.id),
  });

  const updatedDoc = await userRef.get();

  const updatedUser = { id: updatedDoc.id, ...updatedDoc.data() };

  res.status(200).json({
    status: 'success',
    message: 'User updated.',
    data: updatedUser,
  });
});

// @description Get user reviews
// @route GET /api/users/profile/reviews
// @access Private
const getUserReviews = asyncHandler(async (req, res, next) => {
  const reviewRef = db.collection('reviews').orderBy('createdAt', 'desc');
  const snapshot = await reviewRef.get();
  const myReviewSnapshot = snapshot.docs.filter(
    doc => doc.data().user.id === req.user
  );

  const myReviews = myReviewSnapshot.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (snapshot.empty || myReviewSnapshot.length === 0) {
    return next(ApiError.badRequest('No reviews be found.'));
  } else {
    res.status(200).json({
      status: 'success',
      result: myReviews.length,
      data: myReviews,
    });
  }
});

/* ============================ ADMIN CONTROLLERS ============================ */
// @description Get all Users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  const usersRef = db.collection('users').orderBy('isAdmin', 'desc');
  const snapshot = await usersRef.get();
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (snapshot.empty) {
    return next(ApiError.badRequest('No users.'));
  } else {
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    });
  }
});

// @description Get all User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {
  const snapshot = await db.collection('users').doc(req.params.id).get();
  const id = snapshot.id;
  const data = snapshot.data();
  if (id && data) {
    res.status(200).json({ id, ...data });
  } else {
    return next(ApiError.badRequest('User does not exist.'));
  }
});

// @description Update User by ID
// @route PUT /api/users/:id
// @access Private/Admin
const updateUserById = asyncHandler(async (req, res, next) => {
  const userRef = db.collection('users').doc(req.params.id);
  const doc = await userRef.get();
  const user = { id: doc.id, ...doc.data() };

  if (!doc.exists) {
    return next(ApiError.badRequest('User does not exist'));
  } else {
    // Form Date
    const username = req.body.username || user.username;
    const email = req.body.email || user.email;
    const isAdmin = req.body.isAdmin;
    const isActivated = req.body.isActivated;

    await userRef.update({
      username,
      email,
      isAdmin,
      isActivated,
    });
    res.status(200).json({
      status: 'success',
      message: 'User has been updated.',
    });
  }
});

// @description Delete User by ID
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUserById = asyncHandler(async (req, res, next) => {
  const userRef = db.collection('users').doc(req.params.id);
  const doc = await userRef.get();
  if (!doc.exists) {
    return next(ApiError.badRequest('User not exist.'));
  }

  // Get the image bucket Url
  const downloadUrl = doc.data().photo;
  const filePath = getFilePathFromUrl(downloadUrl);

  // Delete the image from the bucket with the Url, only execute this function while the downloadUrl not start with '/' (Default image Url)
  if (!downloadUrl.startsWith('/')) {
    const bucketResponse = await deleteFileFromBucket(filePath);
    if (bucketResponse) {
      const response = await userRef.delete({ exists: true });
      res.status(200).json({
        status: 'success',
        message: 'User has been deleted.',
        deletedAt: response,
      });
    }
  } else {
    const response = await userRef.delete({ exists: true });
    res.status(200).json({
      status: 'success',
      message: 'User has been deleted.',
      deletedAt: response,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUserReviews,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
