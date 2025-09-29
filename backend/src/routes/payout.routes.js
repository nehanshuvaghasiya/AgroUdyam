const express = require('express');
const { body } = require('express-validator');
const { authenticate, restrictTo } = require('../middleware/auth.middleware');
const { validateRequest } = require('../utils/validation');
const {
  requestPayout,
  getFarmerPayouts,
  getPayoutById,
  getAllPayouts,
  approvePayout,
  rejectPayout,
  processPayout,
  calculateEarnings
} = require('../controllers/payout.controller');

const router = express.Router();

// Validation rules
const requestPayoutValidation = [
  body('amount')
    .isFloat({ min: 100 })
    .withMessage('Minimum payout amount is ₹100'),
  body('bankDetails.accountHolderName')
    .trim()
    .notEmpty()
    .withMessage('Account holder name is required'),
  body('bankDetails.accountNumber')
    .trim()
    .notEmpty()
    .withMessage('Account number is required'),
  body('bankDetails.ifscCode')
    .trim()
    .notEmpty()
    .withMessage('IFSC code is required'),
  body('bankDetails.bankName')
    .trim()
    .notEmpty()
    .withMessage('Bank name is required'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Notes cannot be more than 200 characters')
];

const approvePayoutValidation = [
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Notes cannot be more than 200 characters')
];

const rejectPayoutValidation = [
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Rejection reason is required')
    .isLength({ max: 200 })
    .withMessage('Reason cannot be more than 200 characters')
];

const processPayoutValidation = [
  body('transactionId')
    .trim()
    .notEmpty()
    .withMessage('Transaction ID is required'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Notes cannot be more than 200 characters')
];

// All routes require authentication
router.use(authenticate);

// Farmer payout routes
router.post('/request', requestPayoutValidation, validateRequest, requestPayout);
router.get('/farmer', getFarmerPayouts);
router.get('/farmer/:payoutId', getPayoutById);
router.get('/farmer/earnings/calculate', calculateEarnings);

// Admin payout management routes
router.get('/', restrictTo('admin'), getAllPayouts);
router.put('/:payoutId/approve', restrictTo('admin'), approvePayoutValidation, validateRequest, approvePayout);
router.put('/:payoutId/reject', restrictTo('admin'), rejectPayoutValidation, validateRequest, rejectPayout);
router.put('/:payoutId/process', restrictTo('admin'), processPayoutValidation, validateRequest, processPayout);

module.exports = router;
