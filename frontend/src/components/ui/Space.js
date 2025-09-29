// Space Component Wrapper
import React from 'react';
import { Space as AntSpace } from 'antd';

const Space = ({ 
  children,
  size = 'small',
  direction = 'horizontal',
  align = 'center',
  wrap = false,
  split,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntSpace
      size={size}
      direction={direction}
      align={align}
      wrap={wrap}
      split={split}
      className={`krishi-space ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntSpace>
  );
};

export default Space;
