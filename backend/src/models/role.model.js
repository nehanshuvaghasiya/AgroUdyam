const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Role name is required'],
    unique: true,
    enum: ['admin', 'farm_owner', 'farm_manager', 'farm_worker', 'customer'],
    lowercase: true
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isSystemRole: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
roleSchema.index({ name: 1 });
roleSchema.index({ isActive: 1 });

// Virtual for permission count
roleSchema.virtual('permissionCount').get(function() {
  return this.permissions ? this.permissions.length : 0;
});

// Transform JSON output
roleSchema.methods.toJSON = function() {
  const roleObject = this.toObject();
  return roleObject;
};

module.exports = mongoose.model('Role', roleSchema);
