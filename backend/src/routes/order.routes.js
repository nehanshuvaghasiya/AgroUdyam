const express = require('express');
const { body, query } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const { validateRequest } = require('../utils/validation');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getFarmerOrders
} = require('../controllers/order.controller');

const router = express.Router();

// Validation rules
const createOrderValidation = [
  body('products')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one product'),
  body('products.*.productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('products.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress.name')
    .trim()
    .notEmpty()
    .withMessage('Shipping name is required'),
  body('shippingAddress.phone')
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid phone number'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.pincode')
    .isPostalCode('IN')
    .withMessage('Please provide a valid pincode'),
  body('paymentMethod')
    .isIn(['cash_on_delivery', 'online', 'wallet'])
    .withMessage('Invalid payment method')
];

const updateOrderStatusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid order status'),
  body('trackingNumber')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Tracking number must be at least 5 characters')
];

const cancelOrderValidation = [
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Cancellation reason cannot be more than 200 characters')
];

// All routes require authentication
router.use(authenticate);

// Order routes
router.post('/', createOrderValidation, validateRequest, createOrder);
router.get('/', getUserOrders);
router.get('/farmer', getFarmerOrders);
router.get('/:orderId', getOrderById);
router.put('/:orderId/status', updateOrderStatusValidation, validateRequest, updateOrderStatus);
router.put('/:orderId/cancel', cancelOrderValidation, validateRequest, cancelOrder);

module.exports = router;
