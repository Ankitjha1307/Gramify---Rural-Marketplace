const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Artisan = require('../models/Artisan');
const Booking = require('../models/Booking');
const blockchain = require('../utils/blockchain');
const { adminAuth } = require('../middleware/auth');

// @route   POST /api/admin/verify-artisan/:id
// @desc    Verify artisan and mint blockchain verification
// @access  Private (Admin only)
router.post('/verify-artisan/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user || user.role !== 'artisan') {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    // Verify on simulated blockchain
    const blockchainRecord = blockchain.verifyArtisan(
      user._id.toString(),
      user.name
    );

    user.isVerified = true;
    user.blockchainId = blockchainRecord.blockchainId;
    await user.save();

    // Update artisan profile
    const artisan = await Artisan.findOne({ userId: user._id });
    if (artisan) {
      artisan.isBlockchainVerified = true;
      artisan.verificationHash = blockchainRecord.transactionHash;
      await artisan.save();
    }

    res.json({
      success: true,
      user,
      blockchain: blockchainRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private (Admin only)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArtisans = await User.countDocuments({ role: 'artisan' });
    const verifiedArtisans = await User.countDocuments({ role: 'artisan', isVerified: true });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const blockchainStats = blockchain.getStats();

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalArtisans,
        verifiedArtisans,
        totalBookings,
        completedBookings,
        blockchain: blockchainStats,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/admin/pending-artisans
// @desc    Get unverified artisans
// @access  Private (Admin only)
router.get('/pending-artisans', adminAuth, async (req, res) => {
  try {
    const pendingArtisans = await User.find({ 
      role: 'artisan', 
      isVerified: false 
    }).select('-password');

    res.json({
      success: true,
      artisans: pendingArtisans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
