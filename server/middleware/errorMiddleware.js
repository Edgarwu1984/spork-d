const errorHandler = (err, req, res, next) => {
  // Exclude StatusCode 200
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Show stack trace if node environment is in development mode
  res.json({
    messages: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
