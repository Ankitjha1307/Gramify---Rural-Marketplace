const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET || 'gramify_secret_key_2024_hackathon',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
