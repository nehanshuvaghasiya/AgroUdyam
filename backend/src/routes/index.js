const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const farmRoutes = require('./farm.routes');
const payoutRoutes = require('./payout.routes');
const adminRoutes = require('./admin.routes');

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/farms', farmRoutes);
router.use('/payouts', payoutRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
