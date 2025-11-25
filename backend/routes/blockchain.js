const express = require('express');
const router = express.Router();
const blockchain = require('../utils/blockchain');
const { auth } = require('../middleware/auth');

// @route   GET /api/blockchain/verify/:blockchainId
// @desc    Verify blockchain record
// @access  Public
router.get('/verify/:blockchainId', (req, res) => {
  try {
    const status = blockchain.getVerificationStatus(req.params.blockchainId);
    
    res.json({
      success: true,
      verification: status,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/blockchain/stats
// @desc    Get blockchain stats
// @access  Public
router.get('/stats', (req, res) => {
  try {
    const stats = blockchain.getStats();
    
    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/blockchain/chain
// @desc    Get full blockchain
// @access  Private
router.get('/chain', auth, (req, res) => {
  try {
    const chain = blockchain.getChain();
    
    res.json({
      success: true,
      chain,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
