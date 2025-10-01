import api, { apiCall } from './api';

export const userService = {
  // Get user profile
  getProfile: async () => {
    return apiCall(() => api.get('/users/profile'));
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiCall(() => api.put('/users/profile', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }));
  },

  // Get user by ID
  getUserById: async (userId) => {
    return apiCall(() => api.get(`/users/${userId}`));
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiCall(() => api.put('/users/change-password', passwordData));
  },

  // Update user settings
  updateSettings: async (settingsData) => {
    return apiCall(() => api.put('/users/settings', settingsData));
  },

  // Get user settings
  getSettings: async () => {
    return apiCall(() => api.get('/users/settings'));
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    return apiCall(() => api.post('/users/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }));
  },

  // Delete profile picture
  deleteProfilePicture: async () => {
    return apiCall(() => api.delete('/users/profile-picture'));
  },

  // Get user addresses
  getUserAddresses: async () => {
    return apiCall(() => api.get('/users/addresses'));
  },

  // Add address
  addAddress: async (addressData) => {
    return apiCall(() => api.post('/users/addresses', addressData));
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    return apiCall(() => api.put(`/users/addresses/${addressId}`, addressData));
  },

  // Delete address
  deleteAddress: async (addressId) => {
    return apiCall(() => api.delete(`/users/addresses/${addressId}`));
  },

  // Set default address
  setDefaultAddress: async (addressId) => {
    return apiCall(() => api.put(`/users/addresses/${addressId}/set-default`));
  },

  // Get user notifications
  getUserNotifications: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/users/notifications?${queryString}` : '/users/notifications';
    
    return apiCall(() => api.get(url));
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    return apiCall(() => api.put(`/users/notifications/${notificationId}/read`));
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async () => {
    return apiCall(() => api.put('/users/notifications/read-all'));
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    return apiCall(() => api.delete(`/users/notifications/${notificationId}`));
  },

  // Get user statistics
  getUserStats: async () => {
    return apiCall(() => api.get('/users/stats'));
  },

  // Get user activity
  getUserActivity: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/users/activity?${queryString}` : '/users/activity';
    
    return apiCall(() => api.get(url));
  },
};

