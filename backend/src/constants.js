// User Roles
const USER_ROLES = {
  ADMIN: 'admin',
  FARM_OWNER: 'farm_owner',
  FARM_MANAGER: 'farm_manager',
  FARM_WORKER: 'farm_worker',
  CUSTOMER: 'customer'
};

// Permission Names
const PERMISSIONS = {
  // Product permissions
  CAN_CREATE_PRODUCT: 'can_create_product',
  CAN_READ_PRODUCT: 'can_read_product',
  CAN_UPDATE_PRODUCT: 'can_update_product',
  CAN_DELETE_PRODUCT: 'can_delete_product',
  
  // Order permissions
  CAN_CREATE_ORDER: 'can_create_order',
  CAN_READ_ORDER: 'can_read_order',
  CAN_UPDATE_ORDER: 'can_update_order',
  CAN_DELETE_ORDER: 'can_delete_order',
  
  // User management permissions
  CAN_CREATE_USER: 'can_create_user',
  CAN_READ_USER: 'can_read_user',
  CAN_UPDATE_USER: 'can_update_user',
  CAN_DELETE_USER: 'can_delete_user',
  
  // Farm management permissions
  CAN_MANAGE_FARM: 'can_manage_farm',
  CAN_INVITE_STAFF: 'can_invite_staff',
  CAN_UPDATE_STAFF_ROLES: 'can_update_staff_roles',
  
  // Financial permissions
  CAN_REQUEST_PAYOUT: 'can_request_payout',
  CAN_APPROVE_PAYOUT: 'can_approve_payout',
  CAN_VIEW_WALLET: 'can_view_wallet',
  
  // Review permissions
  CAN_CREATE_REVIEW: 'can_create_review',
  CAN_READ_REVIEW: 'can_read_review',
  CAN_UPDATE_REVIEW: 'can_update_review',
  CAN_DELETE_REVIEW: 'can_delete_review',
  
  // Admin permissions
  CAN_VIEW_ANALYTICS: 'can_view_analytics',
  CAN_MANAGE_SYSTEM: 'can_manage_system',
  CAN_HANDLE_DISPUTES: 'can_handle_disputes'
};

// Order Status
const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Payout Status
const PAYOUT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PROCESSED: 'processed'
};

// Dispute Status
const DISPUTE_STATUS = {
  OPEN: 'open',
  UNDER_REVIEW: 'under_review',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
};

// Payment Status
const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Product Categories
const PRODUCT_CATEGORIES = {
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  GRAINS: 'grains',
  SPICES: 'spices',
  HERBS: 'herbs',
  DAIRY: 'dairy',
  POULTRY: 'poultry',
  OTHER: 'other'
};

// File Upload Constants
const FILE_UPLOAD = {
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(','),
  UPLOAD_PATH: 'uploads/'
};

// Pagination Constants
const PAGINATION = {
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
  MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE) || 100
};

// JWT Constants
const JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  REFRESH_EXPIRES_IN: '30d'
};

// Email Templates
const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  ORDER_CONFIRMATION: 'order_confirmation',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  PASSWORD_RESET: 'password_reset',
  STAFF_INVITATION: 'staff_invitation',
  PAYOUT_APPROVED: 'payout_approved',
  PAYOUT_REJECTED: 'payout_rejected'
};

module.exports = {
  USER_ROLES,
  PERMISSIONS,
  ORDER_STATUS,
  PAYOUT_STATUS,
  DISPUTE_STATUS,
  PAYMENT_STATUS,
  PRODUCT_CATEGORIES,
  FILE_UPLOAD,
  PAGINATION,
  JWT,
  EMAIL_TEMPLATES
};
