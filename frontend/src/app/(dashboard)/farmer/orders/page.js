'use client';

import { useState, useEffect } from 'react';
import { Layout, Card, Button, Table, Space, Tag, message, Select, Input, Drawer, Descriptions, Timeline, Steps, Typography } from 'antd';
import { 
  FileTextOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { orderService } from '@/services/order.service';

const { Title, Text } = Typography;

export default function FarmerOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [page, pageSize, statusFilter, searchText]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = { page, limit: pageSize };
      if (statusFilter) params.status = statusFilter;
      if (searchText) params.search = searchText;

      const result = await orderService.getFarmerOrders(params);
      if (result.success) {
        setOrders(result.data.orders || []);
        setTotal(result.data.pagination?.total || 0);
      } else {
        message.error(result.message || 'Failed to load orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const result = await orderService.updateOrderStatus(orderId, { status: newStatus });
      if (result.success) {
        message.success('Order status updated successfully!');
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        message.error(result.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      message.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      confirmed: 'blue',
      processing: 'cyan',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red'
    };
    return colors[status] || 'default';
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (id) => <Text strong>#{id?.slice(-8)}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => (
        <div>
          <Text strong>{customer?.name || 'N/A'}</Text>
          <div className="text-sm text-gray-500">{customer?.phone || customer?.email}</div>
        </div>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <div>
          <Text>{products?.length || 0} items</Text>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => <Text strong className="text-green-600">₹{amount?.toLocaleString() || 0}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status?.toUpperCase()}</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setDrawerVisible(true);
            }}
          />
          <Select
            value={record.status}
            onChange={(value) => handleUpdateStatus(record._id, value)}
            style={{ width: 130 }}
            size="small"
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="confirmed">Confirmed</Select.Option>
            <Select.Option value="processing">Processing</Select.Option>
            <Select.Option value="shipped">Shipped</Select.Option>
            <Select.Option value="delivered">Delivered</Select.Option>
          </Select>
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute requiredRoles={['farm_owner', 'farm_manager', 'farm_worker']}>
      <Layout className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Title level={2} className="mb-2">Orders Management</Title>
              <Text className="text-gray-600">Manage and track your orders</Text>
            </div>
            <Link href="/farmer">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>

          <Card className="mb-6 shadow-lg border-0">
            <Space size="middle" wrap>
              <Input
                placeholder="Search orders..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
                allowClear
              />
              <Select
                placeholder="Filter by status"
                value={statusFilter || undefined}
                onChange={setStatusFilter}
                style={{ width: 200 }}
                allowClear
              >
                <Select.Option value="">All Status</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="confirmed">Confirmed</Select.Option>
                <Select.Option value="processing">Processing</Select.Option>
                <Select.Option value="shipped">Shipped</Select.Option>
                <Select.Option value="delivered">Delivered</Select.Option>
              </Select>
            </Space>
          </Card>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="shadow-lg border-0">
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="_id"
                loading={loading}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  total: total,
                  onChange: (newPage, newPageSize) => {
                    setPage(newPage);
                    setPageSize(newPageSize);
                  },
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} orders`,
                }}
              />
            </Card>
          </motion.div>

          <Drawer
            title={`Order #${selectedOrder?._id?.slice(-8)}`}
            placement="right"
            width={600}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
          >
            {selectedOrder && (
              <div>
                <Descriptions title="Order Details" column={1} bordered>
                  <Descriptions.Item label="Order ID">#{selectedOrder._id?.slice(-8)}</Descriptions.Item>
                  <Descriptions.Item label="Customer">{selectedOrder.customer?.name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{selectedOrder.customer?.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{selectedOrder.customer?.phone || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Total Amount">₹{selectedOrder.totalAmount?.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={getStatusColor(selectedOrder.status)}>{selectedOrder.status?.toUpperCase()}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Order Date">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </Descriptions.Item>
                </Descriptions>

                <div className="mt-6">
                  <Title level={5}>Products</Title>
                  {selectedOrder.products?.map((item, index) => (
                    <Card key={index} size="small" className="mb-2">
                      <div className="flex justify-between">
                        <div>
                          <Text strong>{item.product?.name || 'Product'}</Text>
                          <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                        </div>
                        <Text strong>₹{item.total?.toLocaleString()}</Text>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <Title level={5}>Update Status</Title>
                  <Select
                    value={selectedOrder.status}
                    onChange={(value) => handleUpdateStatus(selectedOrder._id, value)}
                    style={{ width: '100%' }}
                    size="large"
                  >
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="confirmed">Confirmed</Select.Option>
                    <Select.Option value="processing">Processing</Select.Option>
                    <Select.Option value="shipped">Shipped</Select.Option>
                    <Select.Option value="delivered">Delivered</Select.Option>
                  </Select>
                </div>
              </div>
            )}
          </Drawer>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

