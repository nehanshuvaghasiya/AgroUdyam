import api, { apiCall } from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    return apiCall(() => api.post('/auth/register', userData));
  },

  // Login user
  login: async (credentials) => {
    return apiCall(() => api.post('/auth/login', credentials));
  },

  // Logout user
  logout: async () => {
    return apiCall(() => api.post('/auth/logout'));
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    return apiCall(() => api.post('/auth/refresh-token', { refreshToken }));
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiCall(() => api.post('/auth/forgot-password', { email }));
  },

  // Reset password
  resetPassword: async (token, password) => {
    return apiCall(() => api.post('/auth/reset-password', { token, password }));
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiCall(() => api.post('/auth/change-password', passwordData));
  },

  // Get user profile
  getProfile: async () => {
    return apiCall(() => api.get('/users/profile'));
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiCall(() => api.put('/users/profile', profileData));
  },

  // Update user avatar
  updateAvatar: async (formData) => {
    return apiCall(() => api.put('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }));
  },

  // Get user statistics
  getUserStats: async () => {
    return apiCall(() => api.get('/users/stats'));
  },

  // Delete user account
  deleteAccount: async (password) => {
    return apiCall(() => api.delete('/users/account', { data: { password } }));
  },

  // Get user notifications
  getNotifications: async (page = 1, limit = 10) => {
    return apiCall(() => api.get(`/users/notifications?page=${page}&limit=${limit}`));
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    return apiCall(() => api.put(`/users/notifications/${notificationId}/read`));
  },

  // Get public user profile
  getUserById: async (userId) => {
    return apiCall(() => api.get(`/users/${userId}`));
  },
};
