const ApiError = require('../utils/ApiError');

// const errorHandler = (err, req, res, next) => {
//   // Set status code to 500 when does not specify the status code as default 200
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);

//   res.locals.status = statusCode;
//   res.locals.message = err.message;
//   res.locals.error = err;
//   console.log(res.locals);

//   // Show stack trace if node environment is in development mode
//   res.json({
//     messages: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
//   next();
// };

// // Handle Invalid routes
// const notFound = (req, res, next) => {
//   const error = new Error(`404 Not Found - ${req.originalUrl}`);

//   res.status(404);
//   next(error);
// };

// module.exports = { errorHandler, notFound };

const apiErrorHandler = (err, req, res, next) => {
  // [1] Middleware Checks if the Error is one of our Pre-Defined Methods ("instanceof")
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  } else {
    // [2] Middleware Catch-All: If it doesn't fall within a Pre-Defined Method, it passes to a General Error Message
    console.error(err);
    res.status(500).json({
      message: `Something went wrong.`,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }
};

module.exports = apiErrorHandler;
