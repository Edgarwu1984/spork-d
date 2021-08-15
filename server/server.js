import express, { json } from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API..running');
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
