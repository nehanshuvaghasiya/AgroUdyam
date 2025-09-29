// Card Component Wrapper
import React from 'react';
import { Card as AntCard } from 'antd';

const Card = ({ 
  title,
  children,
  extra,
  loading = false,
  hoverable = false,
  bordered = true,
  size = 'default',
  className = '',
  style = {},
  bodyStyle = {},
  headStyle = {},
  ...props 
}) => {
  return (
    <AntCard
      title={title}
      extra={extra}
      loading={loading}
      hoverable={hoverable}
      bordered={bordered}
      size={size}
      className={`krishi-card ${className}`}
      style={style}
      bodyStyle={bodyStyle}
      headStyle={headStyle}
      {...props}
    >
      {children}
    </AntCard>
  );
};

export default Card;
