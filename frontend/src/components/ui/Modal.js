// Modal Component Wrapper
import React from 'react';
import { Modal as AntModal } from 'antd';

const Modal = ({ 
  children,
  title,
  open = false,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  okType = 'primary',
  cancelButtonProps,
  okButtonProps,
  confirmLoading = false,
  destroyOnClose = false,
  maskClosable = true,
  closable = true,
  width = 520,
  centered = false,
  className = '',
  style = {},
  bodyStyle = {},
  ...props 
}) => {
  return (
    <AntModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okType={okType}
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      confirmLoading={confirmLoading}
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable}
      closable={closable}
      width={width}
      centered={centered}
      className={`krishi-modal ${className}`}
      style={style}
      bodyStyle={bodyStyle}
      {...props}
    >
      {children}
    </AntModal>
  );
};

// Modal.confirm wrapper
Modal.confirm = AntModal.confirm;

// Modal.info wrapper
Modal.info = AntModal.info;

// Modal.success wrapper
Modal.success = AntModal.success;

// Modal.error wrapper
Modal.error = AntModal.error;

// Modal.warning wrapper
Modal.warning = AntModal.warning;

export default Modal;
