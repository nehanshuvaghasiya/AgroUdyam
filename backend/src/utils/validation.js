const { validationResult } = require('express-validator');
const ApiError = require('./ApiError');

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    return next(new ApiError(400, 'Validation failed', errorMessages));
  }
  
  next();
};

// Custom validation functions
const isValidObjectId = (value) => {
  return /^[0-9a-fA-F]{24}$/.test(value);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

const isValidPincode = (pincode) => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

const isValidPassword = (password) => {
  // At least 6 characters, contains at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  return passwordRegex.test(password);
};

const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>]/g, '');
  }
  return input;
};

const validatePagination = (page, limit, maxLimit = 100) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  
  return {
    page: Math.max(1, pageNum),
    limit: Math.min(Math.max(1, limitNum), maxLimit)
  };
};

const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date format');
  }
  
  if (start > end) {
    throw new Error('Start date cannot be after end date');
  }
  
  return { start, end };
};

const validateFileUpload = (file, allowedTypes, maxSize) => {
  if (!file) {
    throw new Error('No file uploaded');
  }
  
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
  }
  
  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
  }
  
  return true;
};

module.exports = {
  validateRequest,
  isValidObjectId,
  isValidEmail,
  isValidPhone,
  isValidPincode,
  isValidPassword,
  sanitizeInput,
  validatePagination,
  validateDateRange,
  validateFileUpload
};
