const crypto = require('crypto');

/**
 * Simulated Blockchain for Gramify
 * This simulates blockchain functionality without real Web3 integration
 */

class SimulatedBlockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      hash: this.calculateHash(0, Date.now(), [], '0'),
    };
    this.chain.push(genesisBlock);
  }

  calculateHash(index, timestamp, transactions, previousHash) {
    const data = index + timestamp + JSON.stringify(transactions) + previousHash;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transactions) {
    const previousBlock = this.getLatestBlock();
    const newBlock = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      transactions: transactions,
      previousHash: previousBlock.hash,
    };
    newBlock.hash = this.calculateHash(
      newBlock.index,
      newBlock.timestamp,
      newBlock.transactions,
      newBlock.previousHash
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  // Verify artisan and create blockchain record
  verifyArtisan(artisanId, artisanName) {
    const transaction = {
      type: 'ARTISAN_VERIFICATION',
      artisanId: artisanId,
      artisanName: artisanName,
      timestamp: Date.now(),
      verified: true,
    };
    
    const block = this.addBlock([transaction]);
    return {
      success: true,
      blockchainId: block.hash,
      transactionHash: crypto.createHash('sha256').update(JSON.stringify(transaction)).digest('hex'),
      block: block,
    };
  }

  // Create service provenance record
  createServiceProvenance(serviceId, artisanId, serviceTitle) {
    const transaction = {
      type: 'SERVICE_PROVENANCE',
      serviceId: serviceId,
      artisanId: artisanId,
      serviceTitle: serviceTitle,
      timestamp: Date.now(),
    };
    
    const block = this.addBlock([transaction]);
    return {
      success: true,
      provenanceHash: block.hash,
      transactionHash: crypto.createHash('sha256').update(JSON.stringify(transaction)).digest('hex'),
      block: block,
    };
  }

  // Record booking on blockchain
  recordBooking(bookingId, customerId, artisanId, amount) {
    const transaction = {
      type: 'BOOKING_RECORD',
      bookingId: bookingId,
      customerId: customerId,
      artisanId: artisanId,
      amount: amount,
      timestamp: Date.now(),
    };
    
    const block = this.addBlock([transaction]);
    return {
      success: true,
      bookingHash: block.hash,
      transactionHash: crypto.createHash('sha256').update(JSON.stringify(transaction)).digest('hex'),
      block: block,
    };
  }

  // Get verification status
  getVerificationStatus(blockchainId) {
    const block = this.chain.find(b => b.hash === blockchainId);
    if (!block) {
      return { verified: false, message: 'No blockchain record found' };
    }
    
    return {
      verified: true,
      block: block,
      timestamp: block.timestamp,
      transactions: block.transactions,
    };
  }

  // Get full chain (for admin viewing)
  getChain() {
    return this.chain;
  }

  // Get blockchain stats
  getStats() {
    return {
      totalBlocks: this.chain.length,
      totalTransactions: this.chain.reduce((acc, block) => acc + block.transactions.length, 0),
      latestBlock: this.getLatestBlock(),
    };
  }
}

// Singleton instance
const blockchainInstance = new SimulatedBlockchain();

module.exports = blockchainInstance;
