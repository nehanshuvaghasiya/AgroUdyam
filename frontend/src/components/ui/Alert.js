// Alert Component Wrapper
import React from 'react';
import { Alert as AntAlert } from 'antd';

const Alert = ({ 
  message,
  description,
  type = 'info',
  showIcon = false,
  closable = false,
  onClose,
  action,
  banner = false,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntAlert
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
      closable={closable}
      onClose={onClose}
      action={action}
      banner={banner}
      className={`krishi-alert krishi-alert-${type} ${className}`}
      style={style}
      {...props}
    />
  );
};

export default Alert;
