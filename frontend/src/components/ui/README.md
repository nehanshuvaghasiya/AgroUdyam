# AgroUdyam UI Components

This directory contains centralized Ant Design components for consistent usage across the AgroUdyam application.

## 🎯 Purpose

All Ant Design components are wrapped and configured in one place to ensure:
- **Consistent styling** across the entire application
- **Centralized theme management**
- **Easy maintenance** and updates
- **Type safety** and better developer experience
- **Custom branding** for AgroUdyam

## 📁 Structure

```
src/components/ui/
├── index.js              # Main export file
├── theme.js              # Theme configuration
├── Button.js             # Button component wrapper
├── Input.js              # Input component wrapper
├── Card.js               # Card component wrapper
├── Form.js               # Form component wrapper
├── Table.js              # Table component wrapper
├── Modal.js              # Modal component wrapper
├── Select.js             # Select component wrapper
├── Layout.js             # Layout component wrapper
├── ConfigProvider.js     # ConfigProvider wrapper
├── Message.js            # Message component wrapper
├── Notification.js       # Notification component wrapper
├── Alert.js              # Alert component wrapper
├── Space.js              # Space component wrapper
├── Divider.js            # Divider component wrapper
└── Spin.js               # Spin component wrapper
```

## 🚀 Usage

### Import Components

```javascript
// Import individual components
import { Button, Input, Card, Form } from '@/components/ui';

// Or import specific components
import { Button } from '@/components/ui/Button';
```

### Basic Usage Examples

#### Button
```javascript
import { Button } from '@/components/ui';

<Button type="primary" size="large" onClick={handleClick}>
  Click Me
</Button>
```

#### Form
```javascript
import { Form, Input, Button } from '@/components/ui';

const [form] = Form.useForm();

<Form form={form} onFinish={handleSubmit}>
  <Form.Item name="email" rules={[{ required: true }]}>
    <Input placeholder="Enter email" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">Submit</Button>
  </Form.Item>
</Form>
```

#### Table
```javascript
import { Table } from '@/components/ui';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
];

<Table columns={columns} dataSource={data} />
```

#### Modal
```javascript
import { Modal, Button } from '@/components/ui';

const [visible, setVisible] = useState(false);

<Button onClick={() => setVisible(true)}>Open Modal</Button>
<Modal
  title="Example Modal"
  open={visible}
  onOk={() => setVisible(false)}
  onCancel={() => setVisible(false)}
>
  Modal content here
</Modal>
```

#### Messages and Notifications
```javascript
import { Message, Notification } from '@/components/ui';

// Show success message
Message.success('Operation completed successfully!');

// Show notification
Notification.success({
  message: 'Success',
  description: 'Your data has been saved.',
});
```

## 🎨 Theme Configuration

The theme is configured in `theme.js` with AgroUdyam branding:

- **Primary Color**: Green (#52c41a) - representing agriculture/nature
- **Success Color**: Green (#52c41a)
- **Warning Color**: Orange (#faad14)
- **Error Color**: Red (#ff4d4f)
- **Info Color**: Blue (#1890ff)

### Customizing Theme

To modify the theme, update the `themeConfig` object in `theme.js`:

```javascript
export const themeConfig = {
  token: {
    colorPrimary: '#your-color',
    borderRadius: 8,
    // ... other tokens
  },
  components: {
    Button: {
      borderRadius: 8,
      // ... other component styles
    },
  },
};
```

## 🔧 Adding New Components

To add a new Ant Design component wrapper:

1. Create a new file in `src/components/ui/` (e.g., `DatePicker.js`)
2. Wrap the Ant Design component with consistent props and styling
3. Add the export to `index.js`
4. Update this documentation

Example:
```javascript
// DatePicker.js
import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';

const DatePicker = ({ 
  placeholder = 'Select date',
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <AntDatePicker
      placeholder={placeholder}
      className={`krishi-datepicker ${className}`}
      style={style}
      {...props}
    />
  );
};

export default DatePicker;
```

## 📝 Best Practices

1. **Always use centralized components** instead of importing directly from 'antd'
2. **Use consistent className patterns** (krishi-* prefix)
3. **Provide sensible defaults** for common props
4. **Maintain backward compatibility** when updating components
5. **Test components** after making changes
6. **Document new components** in this README

## 🐛 Troubleshooting

### Common Issues

1. **Import errors**: Make sure you're importing from `@/components/ui` not `antd`
2. **Styling issues**: Check if the component is wrapped with `ConfigProvider`
3. **Theme not applied**: Ensure `ConfigProvider` is at the root level

### Getting Help

- Check the example file: `src/components/examples/ComponentUsageExample.js`
- Review the Ant Design documentation for component-specific props
- Check the theme configuration in `theme.js`

## 🔄 Migration Guide

If you have existing components using direct Ant Design imports:

### Before (❌ Don't do this)
```javascript
import { Button, Input } from 'antd';

<Button type="primary">Click me</Button>
<Input placeholder="Enter text" />
```

### After (✅ Do this)
```javascript
import { Button, Input } from '@/components/ui';

<Button type="primary">Click me</Button>
<Input placeholder="Enter text" />
```

## 📊 Benefits

- **Consistency**: All components follow the same design system
- **Maintainability**: Changes in one place affect the entire app
- **Performance**: Optimized imports and tree-shaking
- **Developer Experience**: Better IntelliSense and type safety
- **Branding**: Consistent AgroUdyam look and feel
