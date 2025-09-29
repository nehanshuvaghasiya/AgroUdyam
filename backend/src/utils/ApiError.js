// Custom API Error class
class ApiError extends Error {
  constructor(statusCode, message, errors = null, isOperational = true) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;
    this.errors = errors;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
