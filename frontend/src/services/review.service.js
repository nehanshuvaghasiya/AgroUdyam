import api, { apiCall } from './api';

export const reviewService = {
  // Create review
  createReview: async (reviewData) => {
    return apiCall(() => api.post('/reviews', reviewData));
  },

  // Get product reviews
  getProductReviews: async (productId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/products/${productId}/reviews?${queryString}` : `/products/${productId}/reviews`;
    
    return apiCall(() => api.get(url));
  },

  // Get user reviews
  getUserReviews: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/reviews/my-reviews?${queryString}` : '/reviews/my-reviews';
    
    return apiCall(() => api.get(url));
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    return apiCall(() => api.put(`/reviews/${reviewId}`, reviewData));
  },

  // Delete review
  deleteReview: async (reviewId) => {
    return apiCall(() => api.delete(`/reviews/${reviewId}`));
  },

  // Like review
  likeReview: async (reviewId) => {
    return apiCall(() => api.post(`/reviews/${reviewId}/like`));
  },

  // Unlike review
  unlikeReview: async (reviewId) => {
    return apiCall(() => api.delete(`/reviews/${reviewId}/like`));
  },

  // Report review
  reportReview: async (reviewId, reason) => {
    return apiCall(() => api.post(`/reviews/${reviewId}/report`, { reason }));
  },

  // Get review by ID
  getReviewById: async (reviewId) => {
    return apiCall(() => api.get(`/reviews/${reviewId}`));
  },

  // Get farmer reviews
  getFarmerReviews: async (farmerId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/reviews/farmer/${farmerId}?${queryString}` : `/reviews/farmer/${farmerId}`;
    
    return apiCall(() => api.get(url));
  },

  // Respond to review (farmer only)
  respondToReview: async (reviewId, response) => {
    return apiCall(() => api.post(`/reviews/${reviewId}/respond`, { response }));
  },
};

