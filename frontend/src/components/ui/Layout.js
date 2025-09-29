// Layout Component Wrapper
import React from 'react';
import { Layout as AntLayout } from 'antd';

const Layout = ({ 
  children,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntLayout
      className={`krishi-layout ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntLayout>
  );
};

// Layout.Header wrapper
Layout.Header = ({ 
  children,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntLayout.Header
      className={`krishi-layout-header ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntLayout.Header>
  );
};

// Layout.Content wrapper
Layout.Content = ({ 
  children,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntLayout.Content
      className={`krishi-layout-content ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntLayout.Content>
  );
};

// Layout.Footer wrapper
Layout.Footer = ({ 
  children,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntLayout.Footer
      className={`krishi-layout-footer ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntLayout.Footer>
  );
};

// Layout.Sider wrapper
Layout.Sider = ({ 
  children,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntLayout.Sider
      className={`krishi-layout-sider ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntLayout.Sider>
  );
};

export default Layout;
