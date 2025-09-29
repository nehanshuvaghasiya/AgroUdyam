const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

// Verify JWT token
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ApiError(401, 'Access denied. No token provided.'));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id).populate('role', 'name permissions').populate('farm', 'name');
    
    if (!user) {
      return next(new ApiError(401, 'Token is valid but user no longer exists.'));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new ApiError(401, 'User account has been suspended.'));
    }

    // Check if password was changed after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(new ApiError(401, 'User recently changed password. Please log in again.'));
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Invalid token.'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token expired.'));
    }
    return next(new ApiError(401, 'Token verification failed.'));
  }
};

// Optional authentication (doesn't throw error if no token)
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).populate('role', 'name permissions').populate('farm', 'name');
      
      if (user && user.isActive && !user.changedPasswordAfter(decoded.iat)) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Restrict to specific roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    if (!roles.includes(req.user.role.name)) {
      return next(new ApiError(403, 'You do not have permission to perform this action.'));
    }

    next();
  };
};

// Check if user has specific permission
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    if (!req.user.role.permissions.includes(permission)) {
      return next(new ApiError(403, `You do not have permission to ${permission}.`));
    }

    next();
  };
};

// Check if user owns resource or has admin role
const checkOwnership = (resourceUserIdField = 'user') => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    // Admin can access any resource
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user owns the resource
    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (resourceUserId && resourceUserId !== req.user._id.toString()) {
      return next(new ApiError(403, 'You can only access your own resources.'));
    }

    next();
  };
};

// Check if user belongs to the same farm
const checkFarmAccess = () => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    // Admin can access any resource
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has farm access
    if (!req.user.farm) {
      return next(new ApiError(403, 'You must be associated with a farm to access this resource.'));
    }

    next();
  };
};

module.exports = {
  authenticate,
  optionalAuth,
  restrictTo,
  requirePermission,
  checkOwnership,
  checkFarmAccess
};
