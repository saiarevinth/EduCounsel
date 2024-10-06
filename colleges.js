const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Fetch colleges based on cutoff, fees, and location
router.get('/', async (req, res) => {
  const { cutoff, fees, location } = req.query;

  try {
    // Build the query object based on the provided filters
    const query = {};

    if (cutoff) {
      query.cutoff = { $lte: parseInt(cutoff) };  // Filter by cutoff (less than or equal to the provided cutoff)
    }

    if (fees) {
      query.fees = { $lte: parseInt(fees) };  // Filter by fees (less than or equal to the provided fees)
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };  // Filter by location (case-insensitive partial match)
    }

    // Find colleges that match the query
    const colleges = await College.find(query);
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
