const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['vegetables', 'fruits', 'grains', 'spices', 'herbs', 'dairy', 'poultry', 'other']
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Product unit is required'],
    enum: ['kg', 'g', 'lb', 'piece', 'dozen', 'bunch', 'packet', 'liter', 'ml']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalSales: {
    type: Number,
    default: 0
  },
  harvestDate: Date,
  expiryDate: Date,
  organic: {
    type: Boolean,
    default: false
  },
  certifications: [{
    type: String,
    trim: true
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    vitamins: [String],
    minerals: [String]
  },
  shippingInfo: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    fragile: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

// Index for better query performance
productSchema.index({ farmer: 1 });
productSchema.index({ farm: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ price: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual for availability status
productSchema.virtual('isAvailable').get(function() {
  return this.quantity > 0 && this.isActive;
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primaryImg = this.images.find(img => img.isPrimary);
  return primaryImg || (this.images.length > 0 ? this.images[0] : null);
});

// Transform JSON output
productSchema.methods.toJSON = function() {
  const productObject = this.toObject();
  return productObject;
};

module.exports = mongoose.model('Product', productSchema);
