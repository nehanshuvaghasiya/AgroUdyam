// ConfigProvider Component Wrapper
import React from 'react';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { themeConfig } from './theme';

const ConfigProvider = ({ 
  children,
  theme = themeConfig,
  locale,
  direction = 'ltr',
  componentSize = 'middle',
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntConfigProvider
      theme={theme}
      locale={locale}
      direction={direction}
      componentSize={componentSize}
      className={`krishi-config-provider ${className}`}
      style={style}
      {...props}
    >
      {children}
    </AntConfigProvider>
  );
};

export default ConfigProvider;
