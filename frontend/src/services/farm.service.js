import api, { apiCall } from './api';

export const farmService = {
  // Create farm
  createFarm: async (farmData) => {
    return apiCall(() => api.post('/farms', farmData));
  },

  // Get farm details
  getFarmDetails: async (farmId = null) => {
    const url = farmId ? `/farms/${farmId}` : '/farms/my-farm';
    return apiCall(() => api.get(url));
  },

  // Update farm details
  updateFarmDetails: async (farmId, farmData) => {
    const url = farmId ? `/farms/${farmId}` : '/farms/my-farm';
    return apiCall(() => api.put(url, farmData));
  },

  // Invite staff to farm
  inviteStaff: async (invitationData) => {
    return apiCall(() => api.post('/farms/staff/invite', invitationData));
  },

  // Get farm staff
  getFarmStaff: async (farmId = null) => {
    const url = farmId ? `/farms/${farmId}/staff` : '/farms/my-farm/staff';
    return apiCall(() => api.get(url));
  },

  // Update staff role
  updateStaffRole: async (staffId, roleData) => {
    return apiCall(() => api.put(`/farms/staff/${staffId}/role`, roleData));
  },

  // Remove staff from farm
  removeStaff: async (staffId) => {
    return apiCall(() => api.delete(`/farms/staff/${staffId}`));
  },

  // Accept farm invitation
  acceptInvitation: async (invitationData) => {
    return apiCall(() => api.post('/farms/staff/accept-invitation', invitationData));
  },

  // Get farm analytics
  getFarmAnalytics: async (period = '30') => {
    return apiCall(() => api.get(`/farms/analytics?period=${period}`));
  },

  // Get farm products
  getFarmProducts: async (farmId = null, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const baseUrl = farmId ? `/farms/${farmId}/products` : '/farms/my-farm/products';
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    return apiCall(() => api.get(url));
  },

  // Get farm orders
  getFarmOrders: async (farmId = null, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const baseUrl = farmId ? `/farms/${farmId}/orders` : '/farms/my-farm/orders';
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    return apiCall(() => api.get(url));
  },
};

