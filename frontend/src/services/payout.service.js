import api, { apiCall } from './api';

export const payoutService = {
  // Request payout
  requestPayout: async (payoutData) => {
    return apiCall(() => api.post('/payouts/request', payoutData));
  },

  // Get user payouts
  getUserPayouts: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/payouts?${queryString}` : '/payouts';
    
    return apiCall(() => api.get(url));
  },

  // Get payout by ID
  getPayoutById: async (payoutId) => {
    return apiCall(() => api.get(`/payouts/${payoutId}`));
  },

  // Cancel payout request
  cancelPayout: async (payoutId) => {
    return apiCall(() => api.put(`/payouts/${payoutId}/cancel`));
  },

  // Get payout statistics
  getPayoutStats: async () => {
    return apiCall(() => api.get('/payouts/stats'));
  },

  // Get payout history
  getPayoutHistory: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/payouts/history?${queryString}` : '/payouts/history';
    
    return apiCall(() => api.get(url));
  },

  // Get pending payouts
  getPendingPayouts: async () => {
    return apiCall(() => api.get('/payouts/pending'));
  },

  // Get completed payouts
  getCompletedPayouts: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/payouts/completed?${queryString}` : '/payouts/completed';
    
    return apiCall(() => api.get(url));
  },

  // Update bank details for payout
  updateBankDetails: async (bankData) => {
    return apiCall(() => api.put('/payouts/bank-details', bankData));
  },

  // Get bank details
  getBankDetails: async () => {
    return apiCall(() => api.get('/payouts/bank-details'));
  },
};

