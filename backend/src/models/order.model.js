const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    landmark: String
  },
  billingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
    landmark: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash_on_delivery', 'online', 'wallet'],
    required: true
  },
  paymentIntentId: String,
  transactionId: String,
  trackingNumber: String,
  notes: String,
  statusNotes: String,
  cancellationReason: String,
  refundReason: String,
  refundAmount: Number,
  refundDate: Date,
  expectedDelivery: Date,
  deliveredAt: Date,
  shippingCost: {
    type: Number,
    default: 0
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  couponCode: String,
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: String
}, {
  timestamps: true
});

// Index for better query performance
orderSchema.index({ customer: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'products.product': 1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `KC${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Virtual for order total with shipping and tax
orderSchema.virtual('finalTotal').get(function() {
  return this.totalAmount + this.shippingCost + this.taxAmount - this.discountAmount;
});

// Virtual for order status display
orderSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded'
  };
  return statusMap[this.status] || this.status;
});

// Transform JSON output
orderSchema.methods.toJSON = function() {
  const orderObject = this.toObject();
  return orderObject;
};

module.exports = mongoose.model('Order', orderSchema);
