const express = require('express');
const { body, query } = require('express-validator');
const { authenticate, optionalAuth } = require('../middleware/auth.middleware');
const { uploadMultiple } = require('../middleware/multer.middleware');
const { validateRequest } = require('../utils/validation');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
  updateProductStock,
  getProductCategories,
  searchProducts
} = require('../controllers/product.controller');

const router = express.Router();

// Validation rules
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
    .withMessage('Invalid unit')
];

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
    .withMessage('Quantity must be a non-negative integer')
];

const updateStockValidation = [
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer')
];

// Public routes (no authentication required)
router.get('/', optionalAuth, getAllProducts);
router.get('/categories', getProductCategories);
router.get('/search', optionalAuth, searchProducts);
router.get('/:productId', optionalAuth, getProductById);

// Protected routes (authentication required)
router.use(authenticate);

// Farmer product management routes
router.post('/', uploadMultiple('images', 5), createProductValidation, validateRequest, createProduct);
router.get('/farmer/my-products', getFarmerProducts);
router.put('/:productId', uploadMultiple('images', 5), updateProductValidation, validateRequest, updateProduct);
router.delete('/:productId', deleteProduct);
router.put('/:productId/stock', updateStockValidation, validateRequest, updateProductStock);

module.exports = router;
