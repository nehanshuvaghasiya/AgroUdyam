const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { uploadSingle } = require('../middleware/multer.middleware');
const { validateRequest } = require('../utils/validation');
const {
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  getUserById,
  getUserStats,
  deleteUserAccount,
  getUserNotifications,
  markNotificationAsRead
} = require('../controllers/user.controller');

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid phone number'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot be more than 500 characters')
];

const deleteAccountValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required for account deletion')
];

// All routes require authentication
router.use(authenticate);

// User profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateProfileValidation, validateRequest, updateUserProfile);
router.put('/avatar', uploadSingle('avatar'), updateUserAvatar);
router.get('/stats', getUserStats);
router.delete('/account', deleteAccountValidation, validateRequest, deleteUserAccount);

// Notification routes
router.get('/notifications', getUserNotifications);
router.put('/notifications/:notificationId/read', markNotificationAsRead);

// Public user profile (no authentication required)
router.get('/:userId', getUserById);

module.exports = router;
