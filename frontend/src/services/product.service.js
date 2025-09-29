import api, { apiCall } from './api';

export const productService = {
  // Get all products
  getAllProducts: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    
    return apiCall(() => api.get(url));
  },

  // Get product by ID
  getProductById: async (productId) => {
    return apiCall(() => api.get(`/products/${productId}`));
  },

  // Create product (farmer only)
  createProduct: async (productData) => {
    return apiCall(() => api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }));
  },

  // Update product
  updateProduct: async (productId, productData) => {
    return apiCall(() => api.put(`/products/${productId}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }));
  },

  // Delete product
  deleteProduct: async (productId) => {
    return apiCall(() => api.delete(`/products/${productId}`));
  },

  // Get farmer products
  getFarmerProducts: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/products/farmer/my-products?${queryString}` : '/products/farmer/my-products';
    
    return apiCall(() => api.get(url));
  },

  // Update product stock
  updateProductStock: async (productId, quantity) => {
    return apiCall(() => api.put(`/products/${productId}/stock`, { quantity }));
  },

  // Get product categories
  getProductCategories: async () => {
    return apiCall(() => api.get('/products/categories'));
  },

  // Search products
  searchProducts: async (searchParams) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] !== undefined && searchParams[key] !== null && searchParams[key] !== '') {
        queryParams.append(key, searchParams[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/products/search?${queryString}` : '/products/search';
    
    return apiCall(() => api.get(url));
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    return apiCall(() => api.get(`/products?featured=true&limit=${limit}`));
  },

  // Get products by category
  getProductsByCategory: async (category, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('category', category);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/products?${queryString}` : `/products?category=${category}`;
    
    return apiCall(() => api.get(url));
  },

  // Get products by farmer
  getProductsByFarmer: async (farmerId, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('farmer', farmerId);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/products?${queryString}` : `/products?farmer=${farmerId}`;
    
    return apiCall(() => api.get(url));
  },

  // Get related products
  getRelatedProducts: async (productId, limit = 4) => {
    return apiCall(() => api.get(`/products/${productId}/related?limit=${limit}`));
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

  // Create product review
  createProductReview: async (productId, reviewData) => {
    return apiCall(() => api.post(`/products/${productId}/reviews`, reviewData));
  },
};
