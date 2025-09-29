const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Payout amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'processed'],
    default: 'pending'
  },
  bankDetails: {
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    bankName: { type: String, required: true },
    branchName: String
  },
  notes: {
    type: String,
    maxlength: [200, 'Notes cannot be more than 200 characters']
  },
  adminNotes: String,
  rejectionReason: String,
  transactionId: String,
  processedAt: Date,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectedAt: Date,
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  processNotes: String,
  platformFee: {
    type: Number,
    default: 0
  },
  netAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
payoutSchema.index({ farmer: 1 });
payoutSchema.index({ status: 1 });
payoutSchema.index({ createdAt: -1 });
payoutSchema.index({ approvedBy: 1 });
payoutSchema.index({ processedBy: 1 });

// Pre-save middleware to calculate net amount
payoutSchema.pre('save', function(next) {
  if (this.isModified('amount') || this.isModified('platformFee')) {
    this.netAmount = this.amount - this.platformFee;
  }
  next();
});

// Virtual for status display
payoutSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    processed: 'Processed'
  };
  return statusMap[this.status] || this.status;
});

// Transform JSON output
payoutSchema.methods.toJSON = function() {
  const payoutObject = this.toObject();
  return payoutObject;
};

module.exports = mongoose.model('Payout', payoutSchema);
