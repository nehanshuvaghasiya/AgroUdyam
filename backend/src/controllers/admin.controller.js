const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Payout = require('../models/payout.model');
const { USER_ROLES } = require('../constants');

// Get dashboard analytics
const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalPayouts = await Payout.countDocuments();
  
  const pendingPayouts = await Payout.countDocuments({ status: 'pending' });
  const totalRevenue = await Order.aggregate([
    { $match: { status: 'delivered' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);

  const recentOrders = await Order.find()
    .populate('customer', 'name email')
    .populate('products.product', 'name price')
    .sort({ createdAt: -1 })
    .limit(10);

  const analytics = {
    overview: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalPayouts,
      pendingPayouts,
      totalRevenue: totalRevenue[0]?.total || 0
    },
    recentOrders
  };

  res.status(200).json(new ApiResponse(200, analytics, 'Analytics retrieved successfully'));
});

// Get all users with pagination and filtering
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const role = req.query.role;
  const search = req.query.search;

  const filter = {};
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter)
    .populate('role', 'name permissions')
    .populate('farm', 'name')
    .select('-password')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Users retrieved successfully'));
});

// Update user role
const updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { role: roleId },
    { new: true, runValidators: true }
  ).populate('role', 'name permissions');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'User role updated successfully'));
});

// Suspend/Activate user
const toggleUserStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { isActive },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, `User ${isActive ? 'activated' : 'suspended'} successfully`));
});

// Get system settings
const getSystemSettings = asyncHandler(async (req, res) => {
  // This would typically come from a settings model
  const settings = {
    platformFee: 5, // 5% platform fee
    minPayoutAmount: 100,
    maxPayoutAmount: 10000,
    supportedPaymentMethods: ['stripe', 'bank_transfer'],
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false
    }
  };

  res.status(200).json(new ApiResponse(200, settings, 'System settings retrieved successfully'));
});

// Update system settings
const updateSystemSettings = asyncHandler(async (req, res) => {
  const { platformFee, minPayoutAmount, maxPayoutAmount } = req.body;

  // Validate settings
  if (platformFee < 0 || platformFee > 20) {
    throw new ApiError(400, 'Platform fee must be between 0 and 20 percent');
  }

  if (minPayoutAmount < 0) {
    throw new ApiError(400, 'Minimum payout amount cannot be negative');
  }

  if (maxPayoutAmount < minPayoutAmount) {
    throw new ApiError(400, 'Maximum payout amount must be greater than minimum payout amount');
  }

  // This would typically update a settings model
  const settings = {
    platformFee,
    minPayoutAmount,
    maxPayoutAmount,
    updatedAt: new Date()
  };

  res.status(200).json(new ApiResponse(200, settings, 'System settings updated successfully'));
});

module.exports = {
  getDashboardAnalytics,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getSystemSettings,
  updateSystemSettings
};
