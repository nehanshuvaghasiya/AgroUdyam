const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  type: {
    type: String,
    enum: ['product', 'farmer'],
    default: 'product'
  },
  images: [{
    url: String,
    publicId: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  helpful: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  response: {
    text: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
reviewSchema.index({ user: 1 });
reviewSchema.index({ product: 1 });
reviewSchema.index({ farmer: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ isActive: 1 });
reviewSchema.index({ createdAt: -1 });

// Compound index to ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Virtual for helpful percentage
reviewSchema.virtual('helpfulPercentage').get(function() {
  if (this.helpful.count === 0) return 0;
  return Math.round((this.helpful.count / (this.helpful.count + 1)) * 100);
});

// Transform JSON output
reviewSchema.methods.toJSON = function() {
  const reviewObject = this.toObject();
  return reviewObject;
};

module.exports = mongoose.model('Review', reviewSchema);
