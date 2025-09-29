const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { validateRequest } = require('../utils/validation');
const {
  createFarm,
  getFarmDetails,
  updateFarmDetails,
  inviteStaff,
  getFarmStaff,
  updateStaffRole,
  removeStaff,
  acceptInvitation
} = require('../controllers/farm.controller');

const router = express.Router();

// Validation rules
const createFarmValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Farm name is required')
    .isLength({ max: 100 })
    .withMessage('Farm name cannot be more than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('location.address')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address cannot be more than 200 characters'),
  body('location.city')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('City cannot be more than 50 characters'),
  body('location.state')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('State cannot be more than 50 characters'),
  body('location.pincode')
    .optional()
    .isPostalCode('IN')
    .withMessage('Please provide a valid pincode')
];

const updateFarmValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Farm name cannot be more than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters')
];

const inviteStaffValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .isIn(['farm_manager', 'farm_worker'])
    .withMessage('Invalid role for staff invitation'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Message cannot be more than 200 characters')
];

const updateStaffRoleValidation = [
  body('roleId')
    .isMongoId()
    .withMessage('Invalid role ID')
];

const acceptInvitationValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot be more than 50 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid phone number')
];

// All routes require authentication
router.use(authenticate);

// Farm management routes
router.post('/', createFarmValidation, validateRequest, createFarm);
router.get('/my-farm', getFarmDetails);
router.put('/my-farm', updateFarmValidation, validateRequest, updateFarmDetails);
router.get('/:farmId', getFarmDetails);
router.put('/:farmId', updateFarmValidation, validateRequest, updateFarmDetails);

// Staff management routes
router.post('/invite-staff', inviteStaffValidation, validateRequest, inviteStaff);
router.get('/:farmId/staff', getFarmStaff);
router.put('/staff/:staffId/role', updateStaffRoleValidation, validateRequest, updateStaffRole);
router.delete('/staff/:staffId', removeStaff);

// Invitation acceptance (public route)
router.post('/accept-invitation', acceptInvitationValidation, validateRequest, acceptInvitation);

module.exports = router;
