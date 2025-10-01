// Form Component Wrapper
import React from 'react';
import { Form as AntForm } from 'antd';

const Form = ({ 
  children,
  form,
  layout = 'vertical',
  size = 'middle',
  disabled = false,
  scrollToFirstError = true,
  preserve = true,
  className = '',
  style = {},
  onFinish,
  onFinishFailed,
  ...props 
}) => {
  return (
    <AntForm
      form={form}
      layout={layout}
      size={size}
      disabled={disabled}
      scrollToFirstError={scrollToFirstError}
      preserve={preserve}
      className={`krishi-form ${className}`}
      style={style}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      {...props}
    >
      {children}
    </AntForm>
  );
};

// Form.Item wrapper
Form.Item = AntForm.Item;

// Form.List wrapper
Form.List = AntForm.List;

// Form.Provider wrapper
Form.Provider = AntForm.Provider;

// Form.ErrorList wrapper
Form.ErrorList = AntForm.ErrorList;

// Form.useForm hook
Form.useForm = AntForm.useForm;

// Form.useWatch hook
Form.useWatch = AntForm.useWatch;

export default Form;
