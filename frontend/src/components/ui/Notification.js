// Notification Component Wrapper
import React from 'react';
import { notification as antNotification } from 'antd';

const Notification = {
  success: (config) => {
    antNotification.success({
      ...config,
      className: 'krishi-notification krishi-notification-success',
    });
  },
  
  error: (config) => {
    antNotification.error({
      ...config,
      className: 'krishi-notification krishi-notification-error',
    });
  },
  
  info: (config) => {
    antNotification.info({
      ...config,
      className: 'krishi-notification krishi-notification-info',
    });
  },
  
  warning: (config) => {
    antNotification.warning({
      ...config,
      className: 'krishi-notification krishi-notification-warning',
    });
  },
  
  open: (config) => {
    antNotification.open({
      ...config,
      className: 'krishi-notification',
    });
  },
  
  close: (key) => {
    antNotification.close(key);
  },
  
  destroy: () => {
    antNotification.destroy();
  },
};

export default Notification;
