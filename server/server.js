import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
// Routes
import restaurantRoutes from './routes/restaurantRoutes.js';
import userRoutes from './routes/userRoutes.js';
// Middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// ROUTES
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);

// MIDDLEWARE
app.use(errorHandler);
app.use(notFound);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
