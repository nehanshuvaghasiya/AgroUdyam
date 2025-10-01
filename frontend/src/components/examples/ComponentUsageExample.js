// Example usage of centralized UI components
// This file demonstrates how to use the centralized Ant Design components

import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Form,
  Table,
  Modal,
  Select,
  Layout,
  Message,
  Notification,
  Alert,
  Space,
  Divider,
  Spin,
} from '@/components/ui';

// Example component showing how to use centralized components
const ExampleComponent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Table columns example
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button size="small" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Sample data
  const data = [
    {
      key: '1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  ];

  const handleEdit = (record) => {
    console.log('Edit:', record);
    Message.info('Edit functionality clicked');
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: `This will permanently delete ${record.name}`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        Message.success('Item deleted successfully');
      },
    });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Message.success('Form submitted successfully!');
      Notification.success({
        message: 'Success',
        description: 'Your data has been saved successfully.',
      });
      
      form.resetFields();
    } catch (error) {
      Message.error('Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Layout.Content style={{ padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Alert Example */}
          <Alert
            message="Welcome to AgroUdyam!"
            description="This is an example of how to use our centralized UI components."
            type="success"
            showIcon
            closable
          />

          <Divider>Form Example</Divider>

          {/* Form Example */}
          <Card title="User Information" style={{ maxWidth: 600 }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter your name!' },
                  { min: 2, message: 'Name must be at least 2 characters!' },
                ]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select a role!' }]}
              >
                <Select placeholder="Select your role">
                  <Select.Option value="farmer">Farmer</Select.Option>
                  <Select.Option value="customer">Customer</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                  <Button onClick={() => form.resetFields()}>
                    Reset
                  </Button>
                  <Button type="dashed" onClick={() => setModalVisible(true)}>
                    Open Modal
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>

          <Divider>Table Example</Divider>

          {/* Table Example */}
          <Card title="User List">
            <Spin spinning={loading}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
              />
            </Spin>
          </Card>

          {/* Modal Example */}
          <Modal
            title="Example Modal"
            open={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            okText="OK"
            cancelText="Cancel"
          >
            <p>This is an example modal using our centralized Modal component.</p>
            <p>You can add any content here!</p>
          </Modal>
        </Space>
      </Layout.Content>
    </Layout>
  );
};

export default ExampleComponent;
