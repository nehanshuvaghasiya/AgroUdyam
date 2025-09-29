const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['quality', 'delivery', 'refund', 'other'],
    required: true
  },
  reason: {
    type: String,
    required: [true, 'Dispute reason is required'],
    maxlength: [500, 'Reason cannot be more than 500 characters']
  },
  description: {
    type: String,
    required: [true, 'Dispute description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['open', 'under_review', 'resolved', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  evidence: [{
    type: String, // 'image', 'document', 'video'
    url: String,
    publicId: String,
    description: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  resolution: {
    decision: {
      type: String,
      enum: ['customer_favor', 'farmer_favor', 'partial_refund', 'no_action']
    },
    refundAmount: Number,
    notes: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: [500, 'Message cannot be more than 500 characters']
    },
    isInternal: {
      type: Boolean,
      default: false
    },
    attachments: [{
      type: String,
      url: String,
      publicId: String
    }]
  }],
  closedAt: Date,
  closedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better query performance
disputeSchema.index({ order: 1 });
disputeSchema.index({ customer: 1 });
disputeSchema.index({ farmer: 1 });
disputeSchema.index({ status: 1 });
disputeSchema.index({ priority: 1 });
disputeSchema.index({ assignedTo: 1 });
disputeSchema.index({ createdAt: -1 });

// Virtual for message count
disputeSchema.virtual('messageCount').get(function() {
  return this.messages ? this.messages.length : 0;
});

// Virtual for evidence count
disputeSchema.virtual('evidenceCount').get(function() {
  return this.evidence ? this.evidence.length : 0;
});

// Virtual for status display
disputeSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    open: 'Open',
    under_review: 'Under Review',
    resolved: 'Resolved',
    closed: 'Closed'
  };
  return statusMap[this.status] || this.status;
});

// Transform JSON output
disputeSchema.methods.toJSON = function() {
  const disputeObject = this.toObject();
  return disputeObject;
};

module.exports = mongoose.model('Dispute', disputeSchema);
