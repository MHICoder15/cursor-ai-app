const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    required: [true, 'Please provide a prompt'],
    trim: true,
    maxlength: [500, 'Prompt cannot be more than 500 characters'],
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Query', QuerySchema);