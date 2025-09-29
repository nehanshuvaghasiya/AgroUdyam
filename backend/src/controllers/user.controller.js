const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId)
    .populate('role', 'name permissions')
    .populate('farm', 'name description location')
    .select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'User profile retrieved successfully'));
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, phone, address, bio, preferences } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { name, phone, address, bio, preferences },
    { new: true, runValidators: true }
  ).populate('role', 'name permissions').populate('farm', 'name description location');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json(new ApiResponse(200, userResponse, 'User profile updated successfully'));
});

// Update user avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    throw new ApiError(400, 'Please upload an image file');
  }

  // Upload to Cloudinary
  const { uploadToCloudinary } = require('../integrations/cloudinary.service');
  const result = await uploadToCloudinary(req.file.path);

  // Update user avatar
  const user = await User.findByIdAndUpdate(
    userId,
    { avatar: { url: result.secure_url, publicId: result.public_id } },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'Avatar updated successfully'));
});

// Get user by ID (public profile)
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId)
    .populate('role', 'name')
    .populate('farm', 'name description location')
    .select('-password -email -phone -address');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'User profile retrieved successfully'));
});

// Get user statistics
const getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Get user's role to determine what stats to show
  const user = await User.findById(userId).populate('role', 'name');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  let stats = {};

  if (user.role.name === 'customer') {
    // Customer stats
    const Order = require('../models/order.model');
    const Review = require('../models/review.model');

    const totalOrders = await Order.countDocuments({ customer: userId });
    const completedOrders = await Order.countDocuments({ customer: userId, status: 'delivered' });
    const totalReviews = await Review.countDocuments({ user: userId });

    stats = {
      totalOrders,
      completedOrders,
      totalReviews
    };
  } else if (['farm_owner', 'farm_manager', 'farm_worker'].includes(user.role.name)) {
    // Farmer stats
    const Product = require('../models/product.model');
    const Order = require('../models/order.model');
    const Review = require('../models/review.model');

    const totalProducts = await Product.countDocuments({ farmer: userId });
    const activeProducts = await Product.countDocuments({ farmer: userId, isActive: true });
    
    // Get orders containing products from this farmer
    const orders = await Order.find({ status: 'delivered' })
      .populate({
        path: 'products.product',
        match: { farmer: userId }
      });

    const farmerOrders = orders.filter(order => 
      order.products.some(item => item.product && item.product.farmer.toString() === userId)
    );

    const totalEarnings = farmerOrders.reduce((sum, order) => {
      return sum + order.products.reduce((orderSum, item) => {
        if (item.product && item.product.farmer.toString() === userId) {
          return orderSum + item.total;
        }
        return orderSum;
      }, 0);
    }, 0);

    // Get reviews for farmer's products
    const farmerProducts = await Product.find({ farmer: userId }).select('_id');
    const productIds = farmerProducts.map(product => product._id);
    const totalReviews = await Review.countDocuments({ product: { $in: productIds } });

    stats = {
      totalProducts,
      activeProducts,
      totalOrders: farmerOrders.length,
      totalEarnings,
      totalReviews
    };
  }

  res.status(200).json(new ApiResponse(200, stats, 'User statistics retrieved successfully'));
});

// Delete user account
const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  // Verify password
  const user = await User.findById(userId).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new ApiError(400, 'Incorrect password');
  }

  // Soft delete user
  user.isActive = false;
  user.deletedAt = new Date();
  await user.save();

  res.status(200).json(new ApiResponse(200, null, 'Account deleted successfully'));
});

// Get user notifications
const getUserNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // This would typically come from a notifications model
  // For now, return empty array
  const notifications = [];
  const total = 0;

  res.status(200).json(new ApiResponse(200, {
    notifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Notifications retrieved successfully'));
});

// Mark notification as read
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const userId = req.user.id;

  // This would typically update a notifications model
  // For now, just return success
  res.status(200).json(new ApiResponse(200, null, 'Notification marked as read'));
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  getUserById,
  getUserStats,
  deleteUserAccount,
  getUserNotifications,
  markNotificationAsRead
};
