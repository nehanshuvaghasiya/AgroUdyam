import api, { apiCall } from './api';

export const orderService = {
  // Create order
  createOrder: async (orderData) => {
    return apiCall(() => api.post('/orders', orderData));
  },

  // Get user orders
  getUserOrders: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/orders?${queryString}` : '/orders';
    
    return apiCall(() => api.get(url));
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    return apiCall(() => api.get(`/orders/${orderId}`));
  },

  // Update order status (farmer/admin only)
  updateOrderStatus: async (orderId, statusData) => {
    return apiCall(() => api.put(`/orders/${orderId}/status`, statusData));
  },

  // Cancel order
  cancelOrder: async (orderId, reason) => {
    return apiCall(() => api.put(`/orders/${orderId}/cancel`, { reason }));
  },

  // Get farmer orders
  getFarmerOrders: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/orders/farmer?${queryString}` : '/orders/farmer';
    
    return apiCall(() => api.get(url));
  },

  // Get order analytics
  getOrderAnalytics: async (period = '30') => {
    return apiCall(() => api.get(`/orders/analytics?period=${period}`));
  },

  // Get order statistics
  getOrderStats: async () => {
    return apiCall(() => api.get('/orders/stats'));
  },

  // Track order
  trackOrder: async (orderId) => {
    return apiCall(() => api.get(`/orders/${orderId}/track`));
  },

  // Get order history
  getOrderHistory: async (orderId) => {
    return apiCall(() => api.get(`/orders/${orderId}/history`));
  },

  // Create order dispute
  createOrderDispute: async (orderId, disputeData) => {
    return apiCall(() => api.post(`/orders/${orderId}/dispute`, disputeData));
  },

  // Get order disputes
  getOrderDisputes: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/orders/disputes?${queryString}` : '/orders/disputes';
    
    return apiCall(() => api.get(url));
  },

  // Update order dispute
  updateOrderDispute: async (disputeId, disputeData) => {
    return apiCall(() => api.put(`/orders/disputes/${disputeId}`, disputeData));
  },

  // Get order summary
  getOrderSummary: async (orderId) => {
    return apiCall(() => api.get(`/orders/${orderId}/summary`));
  },

  // Reorder items
  reorderItems: async (orderId) => {
    return apiCall(() => api.post(`/orders/${orderId}/reorder`));
  },

  // Get order receipts
  getOrderReceipt: async (orderId) => {
    return apiCall(() => api.get(`/orders/${orderId}/receipt`));
  },

  // Download order invoice
  downloadOrderInvoice: async (orderId) => {
    return apiCall(() => api.get(`/orders/${orderId}/invoice`, {
      responseType: 'blob',
    }));
  },
};
