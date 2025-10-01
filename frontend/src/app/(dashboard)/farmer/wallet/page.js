'use client';

import { useState, useEffect } from 'react';
import { Layout, Card, Button, Table, Space, Tag, message, Statistic, Row, Col, Modal, Form, Input, Select, Typography } from 'antd';
import { 
  WalletOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { walletService } from '@/services/wallet.service';
import { payoutService } from '@/services/payout.service';

const { Title, Text } = Typography;

export default function FarmerWallet() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState({
    balance: 0,
    availableBalance: 0,
    pendingAmount: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchWalletData();
    fetchTransactions();
  }, []);

  const fetchWalletData = async () => {
    try {
      const result = await walletService.getWalletSummary();
      if (result.success) {
        setWalletData(result.data);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const result = await walletService.getWalletTransactions({ limit: 20 });
      if (result.success) {
        setTransactions(result.data.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPayout = async (values) => {
    try {
      const result = await payoutService.requestPayout(values);
      if (result.success) {
        message.success('Payout request submitted successfully!');
        setShowPayoutModal(false);
        form.resetFields();
        fetchWalletData();
      } else {
        message.error(result.message || 'Failed to request payout');
      }
    } catch (error) {
      console.error('Error requesting payout:', error);
      message.error('Failed to request payout');
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'credit' ? 'green' : 'red'}>
          {type === 'credit' ? 'Credit' : 'Debit'}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <Text strong className={record.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
          {record.type === 'credit' ? '+' : '-'}₹{amount?.toLocaleString()}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <ProtectedRoute requiredRoles={['farm_owner', 'farm_manager', 'farm_worker']}>
      <Layout className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Title level={2} className="mb-2">Wallet</Title>
              <Text className="text-gray-600">Manage your earnings and payouts</Text>
            </div>
            <Space>
              <Link href="/farmer">
                <Button>Back to Dashboard</Button>
              </Link>
              <Button
                type="primary"
                icon={<DollarOutlined />}
                onClick={() => setShowPayoutModal(true)}
                className="bg-green-500 hover:bg-green-600"
              >
                Request Payout
              </Button>
            </Space>
          </div>

          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} md={8}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="shadow-xl border-0">
                  <Statistic
                    title="Current Balance"
                    value={walletData.currentBalance || 0}
                    prefix="₹"
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="shadow-xl border-0">
                  <Statistic
                    title="Available Balance"
                    value={walletData.availableBalance || 0}
                    prefix="₹"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="shadow-xl border-0">
                  <Statistic
                    title="Pending Amount"
                    value={walletData.pendingAmount || 0}
                    prefix="₹"
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </motion.div>
            </Col>
          </Row>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card 
              title={
                <div className="flex items-center space-x-2">
                  <WalletOutlined className="text-green-500" />
                  <span>Transaction History</span>
                </div>
              }
              className="shadow-lg border-0"
              extra={
                <Button icon={<DownloadOutlined />}>Export</Button>
              }
            >
              <Table
                columns={columns}
                dataSource={transactions}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </motion.div>

          <Modal
            title="Request Payout"
            open={showPayoutModal}
            onCancel={() => {
              setShowPayoutModal(false);
              form.resetFields();
            }}
            footer={null}
          >
            <Form form={form} layout="vertical" onFinish={handleRequestPayout}>
              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  { required: true, message: 'Please enter amount' },
                  { 
                    validator: (_, value) => {
                      if (value > (walletData.availableBalance || 0)) {
                        return Promise.reject('Amount exceeds available balance');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input 
                  type="number" 
                  prefix="₹" 
                  placeholder="Enter amount" 
                  size="large"
                  max={walletData.availableBalance || 0}
                />
              </Form.Item>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <Text type="secondary">
                  Available Balance: ₹{walletData.availableBalance?.toLocaleString() || 0}
                </Text>
              </div>

              <Form.Item
                label="Payment Method"
                name="paymentMethod"
                rules={[{ required: true, message: 'Please select payment method' }]}
              >
                <Select placeholder="Select payment method" size="large">
                  <Select.Option value="bank_transfer">Bank Transfer</Select.Option>
                  <Select.Option value="upi">UPI</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Notes" name="notes">
                <Input.TextArea rows={3} placeholder="Add any notes..." />
              </Form.Item>

              <div className="flex justify-end space-x-3">
                <Button onClick={() => {
                  setShowPayoutModal(false);
                  form.resetFields();
                }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className="bg-green-500 hover:bg-green-600">
                  Submit Request
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

