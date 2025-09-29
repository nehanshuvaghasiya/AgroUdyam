// Input Component Wrapper
import React from 'react';
import { Input as AntInput } from 'antd';

const Input = ({ 
  placeholder = '',
  value,
  onChange,
  onPressEnter,
  disabled = false,
  readOnly = false,
  size = 'middle',
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onPressEnter={onPressEnter}
      disabled={disabled}
      readOnly={readOnly}
      size={size}
      prefix={prefix}
      suffix={suffix}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      className={`krishi-input ${className}`}
      style={style}
      {...props}
    />
  );
};

export default Input;
