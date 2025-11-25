const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Artisan = require('../models/Artisan');
const blockchain = require('../utils/blockchain');
const { auth } = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { artisanId, serviceTitle, serviceDescription, amount, address, scheduledDate } = req.body;

    const booking = new Booking({
      customerId: req.user._id,
      artisanId,
      serviceTitle,
      serviceDescription,
      amount,
      address,
      scheduledDate,
    });

    await booking.save();

    // Record on simulated blockchain
    const blockchainRecord = blockchain.recordBooking(
      booking._id.toString(),
      req.user._id.toString(),
      artisanId,
      amount
    );

    booking.blockchainProof = blockchainRecord.transactionHash;
    await booking.save();

    res.status(201).json({
      success: true,
      booking,
      blockchain: blockchainRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let bookings;

    if (req.user.role === 'customer') {
      bookings = await Booking.find({ customerId: req.user._id })
        .populate('artisanId', 'name phone village');
    } else if (req.user.role === 'artisan') {
      bookings = await Booking.find({ artisanId: req.user._id })
        .populate('customerId', 'name phone');
    } else {
      bookings = await Booking.find()
        .populate('customerId', 'name phone')
        .populate('artisanId', 'name phone village');
    }

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    // Update artisan stats if completed
    if (status === 'completed' && booking.status !== 'completed') {
      const artisan = await Artisan.findOne({ userId: booking.artisanId });
      if (artisan) {
        artisan.totalJobs += 1;
        await artisan.save();
      }
    }

    await booking.save();

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
