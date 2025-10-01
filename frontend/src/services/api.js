import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL:  'http://localhost:8081/api/v1',
  timeout: 5000, // Reduced timeout for faster fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const { token } = response.data.data;
          Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'strict' });

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Generic API response handler
const handleApiResponse = (response) => {
  if (response.data.status === 'success') {
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  }
  return {
    success: false,
    message: response.data.message || 'An error occurred',
  };
};

// Generic error handler
const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'An error occurred';
    console.warn('API Error:', message);
    return {
      success: false,
      message,
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received (backend not running)
    console.warn('Backend not available - using mock data');
    return {
      success: false,
      message: 'Backend not available',
      isNetworkError: true,
    };
  } else {
    // Something else happened
    console.warn('Unexpected error:', error.message);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

// Generic API call wrapper
const apiCall = async (apiFunction) => {
  try {
    const response = await apiFunction();
    return handleApiResponse(response);
  } catch (error) {
    // Ensure we always return a proper response object
    const errorResponse = handleApiError(error);
    return errorResponse;
  }
};

// File upload helper
export const uploadFile = async (file, folder = 'general') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Multiple file upload helper
export const uploadMultipleFiles = async (files, folder = 'general') => {
  try {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append('folder', folder);

    const response = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Health check
export const healthCheck = async () => {
  return apiCall(() => api.get('/health'));
};

export default api;
export { apiCall };
