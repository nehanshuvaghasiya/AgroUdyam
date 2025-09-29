const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Permission name is required'],
    unique: true,
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
  category: {
    type: String,
    required: [true, 'Permission category is required'],
    enum: ['product', 'order', 'user', 'farm', 'financial', 'review', 'admin', 'system']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isSystemPermission: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
permissionSchema.index({ name: 1 });
permissionSchema.index({ category: 1 });
permissionSchema.index({ isActive: 1 });

// Transform JSON output
permissionSchema.methods.toJSON = function() {
  const permissionObject = this.toObject();
  return permissionObject;
};

module.exports = mongoose.model('Permission', permissionSchema);
