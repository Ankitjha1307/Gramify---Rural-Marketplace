const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skills: [String],
  bio: String,
  rating: {
    type: Number,
    default: 0,
  },
  totalJobs: {
    type: Number,
    default: 0,
  },
  isBlockchainVerified: {
    type: Boolean,
    default: false,
  },
  verificationHash: {
    type: String,
    default: null,
  },
  services: [{
    title: String,
    description: String,
    price: Number,
    category: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Artisan', artisanSchema);
