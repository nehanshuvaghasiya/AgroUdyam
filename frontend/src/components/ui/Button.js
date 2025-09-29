// Button Component Wrapper
import React from 'react';
import { Button as AntButton } from 'antd';
import { themeConfig } from './theme';

const Button = ({ 
  children, 
  type = 'default', 
  size = 'middle', 
  shape = 'default',
  loading = false,
  disabled = false,
  icon,
  onClick,
  htmlType = 'button',
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntButton
      type={type}
      size={size}
      shape={shape}
      loading={loading}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
      htmlType={htmlType}
      className={`krishi-button ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
