const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
// Remove the deprecated options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gramify')
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully to database');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/artisans', require('./routes/artisans'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/blockchain', require('./routes/blockchain'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Gramify API Server Running 🚀' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
