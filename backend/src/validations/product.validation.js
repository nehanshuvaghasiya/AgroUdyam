const { body } = require('express-validator');

// Product creation validation
const createProductValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot be more than 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot be more than 1000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['vegetables', 'fruits', 'grains', 'spices', 'herbs', 'dairy', 'poultry', 'other'])
    .withMessage('Invalid product category'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('unit')
    .isIn(['kg', 'g', 'lb', 'piece', 'dozen', 'bunch', 'packet', 'liter', 'ml'])
    .withMessage('Invalid unit'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Each tag cannot be more than 20 characters'),
  body('harvestDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid harvest date format'),
  body('expiryDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid expiry date format'),
  body('organic')
    .optional()
    .isBoolean()
    .withMessage('Organic must be a boolean value')
];

// Product update validation
const updateProductValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Product name cannot be more than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot be more than 1000 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('category')
    .optional()
    .isIn(['vegetables', 'fruits', 'grains', 'spices', 'herbs', 'dairy', 'poultry', 'other'])
    .withMessage('Invalid product category'),
  body('unit')
    .optional()
    .isIn(['kg', 'g', 'lb', 'piece', 'dozen', 'bunch', 'packet', 'liter', 'ml'])
    .withMessage('Invalid unit'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Each tag cannot be more than 20 characters')
];

// Product stock update validation
const updateStockValidation = [
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer')
];

// Product search validation
const searchProductValidation = [
  body('q')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),
  body('category')
    .optional()
    .isIn(['vegetables', 'fruits', 'grains', 'spices', 'herbs', 'dairy', 'poultry', 'other'])
    .withMessage('Invalid product category'),
  body('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  body('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  body('farmer')
    .optional()
    .isMongoId()
    .withMessage('Invalid farmer ID')
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  updateStockValidation,
  searchProductValidation
};
