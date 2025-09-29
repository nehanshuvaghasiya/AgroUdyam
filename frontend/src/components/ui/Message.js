// Message Component Wrapper
import React from 'react';
import { message as antMessage } from 'antd';

const Message = {
  success: (content, duration = 3) => {
    antMessage.success({
      content,
      duration,
      className: 'krishi-message krishi-message-success',
    });
  },
  
  error: (content, duration = 3) => {
    antMessage.error({
      content,
      duration,
      className: 'krishi-message krishi-message-error',
    });
  },
  
  info: (content, duration = 3) => {
    antMessage.info({
      content,
      duration,
      className: 'krishi-message krishi-message-info',
    });
  },
  
  warning: (content, duration = 3) => {
    antMessage.warning({
      content,
      duration,
      className: 'krishi-message krishi-message-warning',
    });
  },
  
  loading: (content, duration = 0) => {
    return antMessage.loading({
      content,
      duration,
      className: 'krishi-message krishi-message-loading',
    });
  },
  
  destroy: () => {
    antMessage.destroy();
  },
};

export default Message;
