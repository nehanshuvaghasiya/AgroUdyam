// Spin Component Wrapper
import React from 'react';
import { Spin as AntSpin } from 'antd';

const Spin = ({ 
  children,
  spinning = false,
  size = 'default',
  tip,
  delay = 0,
  wrapperClassName = '',
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntSpin
      spinning={spinning}
      size={size}
      tip={tip}
      delay={delay}
      wrapperClassName={`krishi-spin-wrapper ${wrapperClassName}`}
      className={`krishi-spin ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntSpin>
  );
};

export default Spin;
