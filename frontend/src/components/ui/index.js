// Centralized Ant Design Components Export
// This file exports all UI components for consistent usage across the app

// Import Row, Col, and other simple components directly from antd
import { Row as AntRow, Col as AntCol } from 'antd';

// Layout Components
export { default as Layout } from './Layout';
export { default as ConfigProvider } from './ConfigProvider';
export const Row = AntRow;
export const Col = AntCol;

// Data Entry Components
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Select } from './Select';
export { default as Form } from './Form';

// Typography Components
export { default as Typography } from './Typography';

// Data Display Components
export { default as Table } from './Table';
export { default as Card } from './Card';

// Feedback Components
export { default as Alert } from './Alert';
export { default as Modal } from './Modal';
export { default as Message } from './Message';
export { default as Notification } from './Notification';
export { default as Spin } from './Spin';

// Export lowercase 'message' for consistency with antd API
import MessageComponent from './Message';
export const message = MessageComponent;

// Other Components
export { default as Divider } from './Divider';
export { default as Space } from './Space';

// Theme Configuration
export { themeConfig } from './theme';
