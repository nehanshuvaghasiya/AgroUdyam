const ApiError = require('../utils/ApiError');

// Check if user has specific permission
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin has all permissions
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user's role has the required permission
    if (!req.user.role.permissions.includes(permission)) {
      return next(new ApiError(403, `You do not have permission to ${permission}`));
    }

    next();
  };
};

// Check if user has any of the specified permissions
const requireAnyPermission = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin has all permissions
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has any of the required permissions
    const hasPermission = permissions.some(permission => 
      req.user.role.permissions.includes(permission)
    );

    if (!hasPermission) {
      return next(new ApiError(403, `You do not have any of the required permissions: ${permissions.join(', ')}`));
    }

    next();
  };
};

// Check if user has all of the specified permissions
const requireAllPermissions = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin has all permissions
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has all required permissions
    const hasAllPermissions = permissions.every(permission => 
      req.user.role.permissions.includes(permission)
    );

    if (!hasAllPermissions) {
      return next(new ApiError(403, `You do not have all required permissions: ${permissions.join(', ')}`));
    }

    next();
  };
};

// Check if user can access farm resources
const requireFarmAccess = () => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin can access any farm
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user belongs to a farm
    if (!req.user.farm) {
      return next(new ApiError(403, 'You must be associated with a farm to access this resource'));
    }

    // Check if user is trying to access their own farm or has farm management permissions
    const farmId = req.params.farmId || req.body.farmId || req.query.farmId;
    
    if (farmId && farmId !== req.user.farm._id.toString()) {
      // Check if user has farm management permissions
      const farmPermissions = [
        'can_manage_farm',
        'can_invite_staff',
        'can_update_staff_roles'
      ];
      
      const hasFarmPermission = farmPermissions.some(permission => 
        req.user.role.permissions.includes(permission)
      );

      if (!hasFarmPermission) {
        return next(new ApiError(403, 'You can only access your own farm resources'));
      }
    }

    next();
  };
};

// Check if user can manage products
const requireProductManagement = () => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin can manage all products
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has product management permissions
    const productPermissions = [
      'can_create_product',
      'can_update_product',
      'can_delete_product'
    ];

    const hasProductPermission = productPermissions.some(permission => 
      req.user.role.permissions.includes(permission)
    );

    if (!hasProductPermission) {
      return next(new ApiError(403, 'You do not have permission to manage products'));
    }

    // If user is trying to update/delete a specific product, check ownership
    const productId = req.params.productId || req.params.id;
    if (productId && !req.user.role.permissions.includes('can_manage_system')) {
      // This check will be done in the controller
      req.checkProductOwnership = true;
    }

    next();
  };
};

// Check if user can manage orders
const requireOrderManagement = () => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin can manage all orders
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has order management permissions
    const orderPermissions = [
      'can_create_order',
      'can_read_order',
      'can_update_order',
      'can_delete_order'
    ];

    const hasOrderPermission = orderPermissions.some(permission => 
      req.user.role.permissions.includes(permission)
    );

    if (!hasOrderPermission) {
      return next(new ApiError(403, 'You do not have permission to manage orders'));
    }

    next();
  };
};

// Check if user can manage payouts
const requirePayoutManagement = () => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin can manage all payouts
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has payout permissions
    const payoutPermissions = [
      'can_request_payout',
      'can_approve_payout',
      'can_view_wallet'
    ];

    const hasPayoutPermission = payoutPermissions.some(permission => 
      req.user.role.permissions.includes(permission)
    );

    if (!hasPayoutPermission) {
      return next(new ApiError(403, 'You do not have permission to manage payouts'));
    }

    next();
  };
};

// Check if user can view analytics
const requireAnalyticsAccess = () => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    // Admin can view all analytics
    if (req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has analytics permission
    if (!req.user.role.permissions.includes('can_view_analytics')) {
      return next(new ApiError(403, 'You do not have permission to view analytics'));
    }

    next();
  };
};

module.exports = {
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
  requireFarmAccess,
  requireProductManagement,
  requireOrderManagement,
  requirePayoutManagement,
  requireAnalyticsAccess
};
