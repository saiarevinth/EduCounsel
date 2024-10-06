const express = require('express');
const router = express.Router();
const College = require('../models/College'); // Using the same College model

// Combined Endpoint for both Available Colleges and Choice List
router.post('/colleges', async (req, res) => {
    try {
        const {
            cutoff,
            careerChoice, // Optional for Choice List
            locality,     // Optional for Choice List
            fees,         // Optional for Choice List
            interests     // Optional for Choice List
        } = req.body;

        // Validate cutoff input (it's mandatory)
        if (typeof cutoff !== 'number') {
            return res.status(400).json({ error: 'Cutoff must be a number' });
        }

        console.log(`Received criteria:`, req.body); // Debug log

        // Base filter for both pages: Colleges with a cutoff <= provided cutoff
        const filter = {
            cutoff: { $lte: cutoff } // Colleges with a cutoff less than or equal to the provided cutoff
        };

        // If this request is for the "Choice List" page, apply additional filters
        if (careerChoice || locality || fees || interests) {
            if (typeof fees === 'number') {
                filter.fees = { $lte: fees }; // Colleges with fees less than or equal to provided fees
            }
            if (locality) {
                filter.locality = { $regex: locality, $options: 'i' }; // Case-insensitive locality match
            }
            if (careerChoice) {
                filter.careerChoice = { $regex: careerChoice, $options: 'i' }; // Case-insensitive career choice match
            }
            if (interests) {
                filter.interests = { $regex: interests, $options: 'i' }; // Case-insensitive interests match
            }
        }

        // Find colleges based on the filter
        const colleges = await College.find(filter);
        console.log(`Colleges found: ${colleges.length}`); // Debug log

        if (colleges.length === 0) {
            return res.status(404).json({ message: 'No colleges found for the given criteria' });
        }

        res.json(colleges);
    } catch (error) {
        console.error('Error occurred while fetching colleges:', error); // More detailed error logging
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
