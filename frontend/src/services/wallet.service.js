import api, { apiCall } from './api';

export const walletService = {
  // Get wallet balance
  getWalletBalance: async () => {
    return apiCall(() => api.get('/wallet/balance'));
  },

  // Get wallet transactions
  getWalletTransactions: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/wallet/transactions?${queryString}` : '/wallet/transactions';
    
    return apiCall(() => api.get(url));
  },

  // Add money to wallet
  addMoneyToWallet: async (amount, paymentMethod = 'card') => {
    return apiCall(() => api.post('/wallet/add-money', { amount, paymentMethod }));
  },

  // Get wallet summary
  getWalletSummary: async () => {
    return apiCall(() => api.get('/wallet/summary'));
  },

  // Transfer money to another user
  transferMoney: async (transferData) => {
    return apiCall(() => api.post('/wallet/transfer', transferData));
  },

  // Get wallet analytics
  getWalletAnalytics: async (period = '30') => {
    return apiCall(() => api.get(`/wallet/analytics?period=${period}`));
  },

  // Withdraw from wallet
  withdrawFromWallet: async (withdrawData) => {
    return apiCall(() => api.post('/wallet/withdraw', withdrawData));
  },

  // Get wallet history
  getWalletHistory: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/wallet/history?${queryString}` : '/wallet/history';
    
    return apiCall(() => api.get(url));
  },
};

