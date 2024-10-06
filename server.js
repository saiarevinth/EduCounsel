// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const collegeRoutes = require('./routes/colleges');
require('dotenv').config(); // To load environment variables from .env file

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB URI (Ensure the MONGO_URI is defined)
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/educounseldb';

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/colleges', collegeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
