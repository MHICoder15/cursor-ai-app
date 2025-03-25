require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// app.use(cors());
// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/generate', require('./routes/aiRoutes'));
app.use('/api/queries', require('./routes/queryRoutes'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});