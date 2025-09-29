// Test component to verify centralized UI components are working
import React from 'react';
import { Button, Input, Card, Form, Alert, Space } from '@/components/ui';

const TestComponent = () => {
  return (
    <div className="p-8">
      <Card title="Centralized Components Test">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Alert
            message="Success!"
            description="Centralized UI components are working correctly."
            type="success"
            showIcon
          />
          
          <Form layout="vertical">
            <Form.Item label="Test Input" name="test">
              <Input placeholder="Enter test value" />
            </Form.Item>
            
            <Form.Item>
              <Space>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default TestComponent;
