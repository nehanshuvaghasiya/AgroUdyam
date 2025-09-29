'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin, Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRoles = [], 
  requiredPermissions = [],
  redirectTo = '/login',
  fallback = null 
}) => {
  const { user, isAuthenticated, loading, hasAnyRole, hasAnyPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      // Check role requirements
      if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
        router.push('/unauthorized');
        return;
      }

      // Check permission requirements
      if (requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, loading, user, requiredRoles, requiredPermissions, router, redirectTo, hasAnyRole, hasAnyPermission]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
          size="large"
        />
      </div>
    );
  }

  // Show fallback if not authenticated
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <Result
          status="403"
          title="Authentication Required"
          subTitle="Please log in to access this page."
          extra={
            <Button type="primary" onClick={() => router.push('/login')}>
              Go to Login
            </Button>
          }
        />
      </div>
    );
  }

  // Show fallback if role/permission requirements not met
  if (
    (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) ||
    (requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions))
  ) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <Result
          status="403"
          title="Access Denied"
          subTitle="You don't have permission to access this page."
          extra={
            <Button type="primary" onClick={() => router.push('/')}>
              Go Home
            </Button>
          }
        />
      </div>
    );
  }

  // Render children if all checks pass
  return children;
};

// Higher-order component for protecting pages
export const withAuth = (WrappedComponent, options = {}) => {
  return function AuthenticatedComponent(props) {
    return (
      <ProtectedRoute {...options}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
};

// Role-specific HOCs
export const withAdminAuth = (WrappedComponent) => {
  return withAuth(WrappedComponent, { requiredRoles: ['admin'] });
};

export const withFarmerAuth = (WrappedComponent) => {
  return withAuth(WrappedComponent, { requiredRoles: ['farm_owner', 'farm_manager', 'farm_worker'] });
};

export const withCustomerAuth = (WrappedComponent) => {
  return withAuth(WrappedComponent, { requiredRoles: ['customer'] });
};

// Permission-specific HOCs
export const withPermission = (permission) => (WrappedComponent) => {
  return withAuth(WrappedComponent, { requiredPermissions: [permission] });
};

export const withAnyPermission = (permissions) => (WrappedComponent) => {
  return withAuth(WrappedComponent, { requiredPermissions: permissions });
};

export default ProtectedRoute;
