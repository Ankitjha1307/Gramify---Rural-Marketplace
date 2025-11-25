const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// @route   GET /api/artisans
// @desc    Get all artisans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const artisans = await Artisan.find()
      .populate('userId', 'name email phone village state isVerified blockchainId');

    res.json({
      success: true,
      artisans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/artisans/:id
// @desc    Get artisan by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id)
      .populate('userId', 'name email phone village state isVerified blockchainId');

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    res.json({
      success: true,
      artisan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/artisans/profile
// @desc    Update artisan profile
// @access  Private (Artisan only)
router.put('/profile', auth, async (req, res) => {
  try {
    const { skills, bio, services } = req.body;

    const artisan = await Artisan.findOne({ userId: req.user._id });
    
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan profile not found' });
    }

    if (skills) artisan.skills = skills;
    if (bio) artisan.bio = bio;
    if (services) artisan.services = services;

    await artisan.save();

    res.json({
      success: true,
      artisan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
