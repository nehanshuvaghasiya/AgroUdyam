const jwt = require('jsonwebtoken');
const { JWT } = require('../constants');

// Generate JWT token
const generateToken = (userId, expiresIn = JWT.EXPIRES_IN) => {
  return jwt.sign({ id: userId }, JWT.SECRET, {
    expiresIn
  });
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, JWT.REFRESH_SECRET, {
    expiresIn: JWT.REFRESH_EXPIRES_IN
  });
};

// Verify JWT token
const verifyToken = (token, secret = JWT.SECRET) => {
  return jwt.verify(token, secret);
};

// Generate password reset token
const generatePasswordResetToken = (userId) => {
  return jwt.sign({ id: userId }, JWT.SECRET, {
    expiresIn: '1h'
  });
};

// Generate email verification token
const generateEmailVerificationToken = (userId) => {
  return jwt.sign({ id: userId }, JWT.SECRET, {
    expiresIn: '24h'
  });
};

// Generate invitation token
const generateInvitationToken = (data) => {
  return jwt.sign(data, JWT.SECRET, {
    expiresIn: '7d'
  });
};

// Verify invitation token
const verifyInvitationToken = (token) => {
  return jwt.verify(token, JWT.SECRET);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  generatePasswordResetToken,
  generateEmailVerificationToken,
  generateInvitationToken,
  verifyInvitationToken
};
