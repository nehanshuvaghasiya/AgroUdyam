const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastTransactionAt: Date
}, {
  timestamps: true
});

// Index for better query performance
walletSchema.index({ user: 1 });
walletSchema.index({ isActive: 1 });

// Transform JSON output
walletSchema.methods.toJSON = function() {
  const walletObject = this.toObject();
  return walletObject;
};

module.exports = mongoose.model('Wallet', walletSchema);
