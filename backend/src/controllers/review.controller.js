const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Review = require('../models/review.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// Create review
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment, type } = req.body;
  const userId = req.user.id;

  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  // Check if user has already reviewed this product
  const existingReview = await Review.findOne({
    user: userId,
    product: productId
  });

  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this product');
  }

  // Create review
  const review = await Review.create({
    user: userId,
    product: productId,
    rating,
    comment,
    type: type || 'product'
  });

  // Update product average rating
  await updateProductRating(productId);

  // Populate review with user details
  const populatedReview = await Review.findById(review._id)
    .populate('user', 'name email');

  res.status(201).json(new ApiResponse(201, populatedReview, 'Review created successfully'));
});

// Get product reviews
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const rating = req.query.rating;

  const filter = { product: productId };
  if (rating) filter.rating = parseInt(rating);

  const reviews = await Review.find(filter)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Review.countDocuments(filter);

  // Calculate average rating
  const avgRating = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);

  res.status(200).json(new ApiResponse(200, {
    reviews,
    averageRating: avgRating[0]?.average || 0,
    totalReviews: avgRating[0]?.count || 0,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Product reviews retrieved successfully'));
});

// Get user reviews
const getUserReviews = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const reviews = await Review.find({ user: userId })
    .populate('product', 'name images price')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Review.countDocuments({ user: userId });

  res.status(200).json(new ApiResponse(200, {
    reviews,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'User reviews retrieved successfully'));
});

// Update review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  const review = await Review.findOne({ _id: reviewId, user: userId });
  if (!review) {
    throw new ApiError(404, 'Review not found or you do not have permission to update it');
  }

  // Validate rating
  if (rating && (rating < 1 || rating > 5)) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  // Update review
  if (rating) review.rating = rating;
  if (comment) review.comment = comment;
  review.updatedAt = new Date();
  await review.save();

  // Update product average rating
  await updateProductRating(review.product);

  res.status(200).json(new ApiResponse(200, review, 'Review updated successfully'));
});

// Delete review
const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  const review = await Review.findOne({ _id: reviewId, user: userId });
  if (!review) {
    throw new ApiError(404, 'Review not found or you do not have permission to delete it');
  }

  const productId = review.product;
  await Review.findByIdAndDelete(reviewId);

  // Update product average rating
  await updateProductRating(productId);

  res.status(200).json(new ApiResponse(200, null, 'Review deleted successfully'));
});

// Get farmer reviews (reviews for farmer's products)
const getFarmerReviews = asyncHandler(async (req, res) => {
  const farmerId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Get all products by this farmer
  const farmerProducts = await Product.find({ farmer: farmerId }).select('_id');
  const productIds = farmerProducts.map(product => product._id);

  const reviews = await Review.find({ product: { $in: productIds } })
    .populate('user', 'name email')
    .populate('product', 'name images')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Review.countDocuments({ product: { $in: productIds } });

  res.status(200).json(new ApiResponse(200, {
    reviews,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Farmer reviews retrieved successfully'));
});

// Get review statistics
const getReviewStats = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        ratingDistribution: {
          $push: {
            $switch: {
              branches: [
                { case: { $eq: ['$rating', 5] }, then: 'five' },
                { case: { $eq: ['$rating', 4] }, then: 'four' },
                { case: { $eq: ['$rating', 3] }, then: 'three' },
                { case: { $eq: ['$rating', 2] }, then: 'two' },
                { case: { $eq: ['$rating', 1] }, then: 'one' }
              ],
              default: 'other'
            }
          }
        }
      }
    }
  ]);

  if (stats.length === 0) {
    return res.status(200).json(new ApiResponse(200, {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { five: 0, four: 0, three: 0, two: 0, one: 0 }
    }, 'Review statistics retrieved successfully'));
  }

  const ratingDistribution = stats[0].ratingDistribution.reduce((acc, rating) => {
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  res.status(200).json(new ApiResponse(200, {
    averageRating: stats[0].averageRating,
    totalReviews: stats[0].totalReviews,
    ratingDistribution
  }, 'Review statistics retrieved successfully'));
});

// Helper function to update product rating
const updateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: stats[0].averageRating,
      totalReviews: stats[0].totalReviews
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  getFarmerReviews,
  getReviewStats
};
