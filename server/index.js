const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
// ROUTES
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
// MIDDLEWARE
const {
  errorHandler,
  notFound,
} = require('./middleware/errorHandlingMiddleware');

dotenv.config();
const app = express();

// GLOBAL MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(helmet()); // Set HTTP Headers security
app.use(express.json());

// ROUTES
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);

// ERROR HANDLING MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
