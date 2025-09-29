// Divider Component Wrapper
import React from 'react';
import { Divider as AntDivider } from 'antd';

const Divider = ({ 
  children,
  type = 'horizontal',
  orientation = 'center',
  orientationMargin,
  plain = false,
  dashed = false,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntDivider
      type={type}
      orientation={orientation}
      orientationMargin={orientationMargin}
      plain={plain}
      dashed={dashed}
      className={`krishi-divider ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntDivider>
  );
};

export default Divider;
