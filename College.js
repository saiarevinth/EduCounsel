const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  cutoff: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fees: { // Adding fees field
    type: Number,
    required: true,
  },
  bestFor: { // New field to specify the career choice
    type: String,
    enum: ['Placement', 'Higher Studies', 'Both'], // Restricting to specific values
    required: true,
  },
});

const College = mongoose.model('College', collegeSchema);
module.exports = College;
