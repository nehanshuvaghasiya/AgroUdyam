const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Farm name is required'],
    trim: true,
    maxlength: [100, 'Farm name cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  staff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  images: [{
    url: String,
    publicId: String,
    caption: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [{
    type: String, // Document type
    url: String,
    publicId: String
  }]
}, {
  timestamps: true
});

// Index for better query performance
farmSchema.index({ owner: 1 });
farmSchema.index({ staff: 1 });
farmSchema.index({ isActive: 1 });
farmSchema.index({ verificationStatus: 1 });
farmSchema.index({ 'location.city': 1 });
farmSchema.index({ 'location.state': 1 });

// Virtual for staff count
farmSchema.virtual('staffCount').get(function() {
  return this.staff ? this.staff.length : 0;
});

// Virtual for full address
farmSchema.virtual('fullAddress').get(function() {
  const location = this.location;
  if (!location) return '';
  
  const parts = [location.address, location.city, location.state, location.pincode].filter(Boolean);
  return parts.join(', ');
});

// Transform JSON output
farmSchema.methods.toJSON = function() {
  const farmObject = this.toObject();
  return farmObject;
};

module.exports = mongoose.model('Farm', farmSchema);
