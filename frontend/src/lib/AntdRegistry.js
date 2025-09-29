'use client';

import { AntdRegistry as AntdRegistryProvider } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export function AntdRegistry({ children }) {
  const customTheme = {
    algorithm: defaultAlgorithm,
    token: {
      colorPrimary: '#52c41a',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f',
      colorInfo: '#1890ff',
      borderRadius: 8,
      wireframe: false,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
      Button: {
        borderRadius: 8,
        controlHeight: 40,
        fontWeight: 500,
      },
      Input: {
        borderRadius: 8,
        controlHeight: 40,
      },
      Card: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      Layout: {
        headerBg: '#ffffff',
        bodyBg: '#fafafa',
        footerBg: '#ffffff',
      },
      Menu: {
        borderRadius: 8,
        itemBorderRadius: 8,
      },
      Table: {
        borderRadius: 8,
        headerBg: '#fafafa',
      },
      Form: {
        labelColor: '#262626',
        itemMarginBottom: 24,
      },
      Select: {
        borderRadius: 8,
        controlHeight: 40,
      },
      DatePicker: {
        borderRadius: 8,
        controlHeight: 40,
      },
      Upload: {
        borderRadius: 8,
      },
      Modal: {
        borderRadius: 12,
      },
      Drawer: {
        borderRadius: 12,
      },
      Notification: {
        borderRadius: 8,
      },
      Message: {
        borderRadius: 8,
      },
    },
  };

  return (
    <AntdRegistryProvider>
      <ConfigProvider theme={customTheme}>
        {children}
      </ConfigProvider>
    </AntdRegistryProvider>
  );
}
