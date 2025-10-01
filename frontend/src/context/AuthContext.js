'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { authService } from '@/services/auth.service';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = Cookies.get('accessToken');
        if (token) {
          const userData = await authService.getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid tokens
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      if (response.success) {
        const { user: userData, token, refreshToken } = response.data;
        
        // Store tokens in cookies
        Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', refreshToken, { expires: 30, secure: true, sameSite: 'strict' });
        
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        
        // Redirect based on user role
        redirectBasedOnRole(userData.role?.name);
        
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
        console.log("response",response);
      if (response?.success) {
        const { user: newUser, token, refreshToken } = response.data;
        
        // Store tokens in cookies
        Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', refreshToken, { expires: 30, secure: true, sameSite: 'strict' });
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        toast.success('Registration successful!');
        
        // Redirect based on user role
        redirectBasedOnRole(newUser.role?.name);
        
        return { success: true };
      }else{
        toast.error(response?.message || 'Registration failed');
        return { success: false, error: response?.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens and user data
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await authService.updateProfile(profileData);
      
      if (response.success) {
        setUser(response.data);
        toast.success('Profile updated successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Profile update failed');
      return { success: false, error: error.response?.data?.message || 'Profile update failed' };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      const response = await authService.changePassword(passwordData);
      
      if (response.success) {
        toast.success('Password changed successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Password change error:', error);
      toast.error(error.response?.data?.message || 'Password change failed');
      return { success: false, error: error.response?.data?.message || 'Password change failed' };
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        toast.success('Password reset email sent');
        return { success: true };
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data?.message || 'Failed to send reset email');
      return { success: false, error: error.response?.data?.message || 'Failed to send reset email' };
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      const response = await authService.resetPassword(token, password);
      
      if (response.success) {
        toast.success('Password reset successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.response?.data?.message || 'Password reset failed');
      return { success: false, error: error.response?.data?.message || 'Password reset failed' };
    } finally {
      setLoading(false);
    }
  };

  // Redirect based on user role
  const redirectBasedOnRole = (roleName) => {
    switch (roleName) {
      case 'admin':
        router.push('/admin');
        break;
      case 'farm_owner':
      case 'farm_manager':
      case 'farm_worker':
        router.push('/farmer');
        break;
      case 'customer':
        router.push('/customer');
        break;
      default:
        router.push('/');
    }
  };

  // Check if user has specific role
  const hasRole = (roleName) => {
    return user?.role?.name === roleName;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roleNames) => {
    return roleNames.includes(user?.role?.name);
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return user?.role?.permissions?.includes(permission);
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => user?.role?.permissions?.includes(permission));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
