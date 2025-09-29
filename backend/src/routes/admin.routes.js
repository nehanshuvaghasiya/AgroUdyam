const express = require('express');
const { body, query } = require('express-validator');
const { authenticate, restrictTo } = require('../middleware/auth.middleware');
const { validateRequest } = require('../utils/validation');
const {
  getDashboardAnalytics,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getSystemSettings,
  updateSystemSettings
} = require('../controllers/admin.controller');

const router = express.Router();

// Validation rules
const updateUserRoleValidation = [
  body('roleId')
    .isMongoId()
    .withMessage('Invalid role ID')
];

const toggleUserStatusValidation = [
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

const updateSystemSettingsValidation = [
  body('platformFee')
    .optional()
    .isFloat({ min: 0, max: 20 })
    .withMessage('Platform fee must be between 0 and 20 percent'),
  body('minPayoutAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum payout amount cannot be negative'),
  body('maxPayoutAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum payout amount cannot be negative')
];

// All routes require admin authentication
router.use(authenticate);
router.use(restrictTo('admin'));

// Dashboard and analytics routes
router.get('/dashboard', getDashboardAnalytics);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:userId/role', updateUserRoleValidation, validateRequest, updateUserRole);
router.put('/users/:userId/status', toggleUserStatusValidation, validateRequest, toggleUserStatus);

// System settings routes
router.get('/settings', getSystemSettings);
router.put('/settings', updateSystemSettingsValidation, validateRequest, updateSystemSettings);

module.exports = router;
