const { body } = require('express-validator');

// Order creation validation
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
    .withMessage('Shipping name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot be more than 50 characters'),
  body('shippingAddress.phone')
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid phone number'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required')
    .isLength({ max: 200 })
    .withMessage('Street address cannot be more than 200 characters'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ max: 50 })
    .withMessage('City cannot be more than 50 characters'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
    .isLength({ max: 50 })
    .withMessage('State cannot be more than 50 characters'),
  body('shippingAddress.pincode')
    .isPostalCode('IN')
    .withMessage('Please provide a valid pincode'),
  body('shippingAddress.landmark')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Landmark cannot be more than 100 characters'),
  body('paymentMethod')
    .isIn(['cash_on_delivery', 'online', 'wallet'])
    .withMessage('Invalid payment method'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Notes cannot be more than 200 characters'),
  body('isGift')
    .optional()
    .isBoolean()
    .withMessage('isGift must be a boolean value'),
  body('giftMessage')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Gift message cannot be more than 200 characters')
];

// Order status update validation
const updateOrderStatusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid order status'),
  body('trackingNumber')
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Tracking number must be between 5 and 50 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Notes cannot be more than 200 characters')
];

// Order cancellation validation
const cancelOrderValidation = [
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Cancellation reason cannot be more than 200 characters')
];

// Order refund validation
const refundOrderValidation = [
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Refund reason is required')
    .isLength({ max: 200 })
    .withMessage('Refund reason cannot be more than 200 characters'),
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Refund amount must be a positive number')
];

module.exports = {
  createOrderValidation,
  updateOrderStatusValidation,
  cancelOrderValidation,
  refundOrderValidation
};
