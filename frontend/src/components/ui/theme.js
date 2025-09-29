// Theme Configuration for KrishiConnect
import { theme } from 'antd';

// Custom theme configuration
export const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Primary colors - Green theme for agriculture
    colorPrimary: '#52c41a', // Green
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    
    // Background colors
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    
    // Text colors
    colorTextBase: '#262626',
    colorText: '#262626',
    colorTextSecondary: '#8c8c8c',
    colorTextTertiary: '#bfbfbf',
    colorTextQuaternary: '#d9d9d9',
    
    // Border colors
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    
    // Font settings
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    
    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    
    // Box shadow
    boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  },
  components: {
    // Button customization
    Button: {
      borderRadius: 6,
      fontWeight: 500,
      paddingInline: 20,
      paddingBlock: 8,
    },
    
    // Card customization
    Card: {
      borderRadius: 8,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    },
    
    // Input customization
    Input: {
      borderRadius: 6,
      paddingInline: 12,
      paddingBlock: 8,
    },
    
    // Select customization
    Select: {
      borderRadius: 6,
    },
    
    // Table customization
    Table: {
      borderRadius: 8,
      headerBg: '#fafafa',
    },
    
    // Modal customization
    Modal: {
      borderRadius: 8,
    },
    
    // Form customization
    Form: {
      labelFontSize: 14,
      labelColor: '#262626',
    },
  },
};

// Dark theme configuration
export const darkThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#52c41a',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    colorBgBase: '#141414',
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#262626',
    colorBgLayout: '#000000',
    colorTextBase: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#a6a6a6',
    colorTextTertiary: '#737373',
    colorTextQuaternary: '#404040',
    colorBorder: '#424242',
    colorBorderSecondary: '#303030',
  },
};
