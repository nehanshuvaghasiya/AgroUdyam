const { body } = require('express-validator');

// Review creation validation
const createReviewValidation = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot be more than 500 characters'),
  body('type')
    .optional()
    .isIn(['product', 'farmer'])
    .withMessage('Invalid review type')
];

// Review update validation
const updateReviewValidation = [
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot be more than 500 characters')
];

// Review response validation
const reviewResponseValidation = [
  body('response')
    .trim()
    .notEmpty()
    .withMessage('Response is required')
    .isLength({ max: 500 })
    .withMessage('Response cannot be more than 500 characters')
];

// Review helpful validation
const reviewHelpfulValidation = [
  body('helpful')
    .isBoolean()
    .withMessage('Helpful must be a boolean value')
];

module.exports = {
  createReviewValidation,
  updateReviewValidation,
  reviewResponseValidation,
  reviewHelpfulValidation
};
