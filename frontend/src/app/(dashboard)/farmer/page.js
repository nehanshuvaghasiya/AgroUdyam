'use client';

import { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Button, 
  Table, 
  Space,
  Alert,
  Modal,
  Form,
  Input,
  Select
} from '@/components/ui';
import { 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Tag,
  Avatar,
  Progress,
  List,
  Badge,
  Tooltip,
  Dropdown,
  Menu,
  Tabs,
  Empty,
  Spin
} from 'antd';
import { 
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TrophyOutlined,
  RiseOutlined,
  CalendarOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  FileTextOutlined,
  TeamOutlined,
  WalletOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  HeartOutlined,
  StarOutlined,
  MessageOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  AppstoreOutlined,
  ShopOutlined,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  FireOutlined,
  CrownOutlined,
  GiftOutlined,
  ExperimentOutlined,
  BulbOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import './dashboard.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Enhanced stats data with better metrics
  const stats = [
    {
      title: 'Total Products',
      value: 24,
      change: '+12%',
      changeType: 'increase',
      icon: <AppstoreOutlined />,
      color: '#52c41a',
      bgColor: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
      description: 'Active products in your store'
    },
    {
      title: 'Monthly Sales',
      value: 156,
      change: '+8%',
      changeType: 'increase',
      icon: <DollarOutlined />,
      color: '#1890ff',
      bgColor: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
      description: 'Orders completed this month'
    },
    {
      title: 'Active Orders',
      value: 8,
      change: '-2%',
      changeType: 'decrease',
      icon: <ClockCircleOutlined />,
      color: '#fa8c16',
      bgColor: 'linear-gradient(135deg, #fa8c16 0%, #ffa940 100%)',
      description: 'Orders pending fulfillment'
    },
    {
      title: 'Total Revenue',
      value: 45680,
      prefix: '₹',
      change: '+15%',
      changeType: 'increase',
      icon: <RiseOutlined />,
      color: '#722ed1',
      bgColor: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
      description: 'Revenue generated this month'
    },
    {
      title: 'Customer Rating',
      value: 4.8,
      suffix: '/5',
      change: '+0.2',
      changeType: 'increase',
      icon: <StarOutlined />,
      color: '#f59e0b',
      bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      description: 'Average customer satisfaction'
    },
    {
      title: 'Farm Visits',
      value: 23,
      change: '+18%',
      changeType: 'increase',
      icon: <EnvironmentOutlined />,
      color: '#10b981',
      bgColor: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      description: 'Farm tours booked this week'
    }
  ];

  const recentOrders = [
    {
      key: '1',
      orderId: '#ORD-001',
      customer: 'John Doe',
      customerAvatar: 'JD',
      product: 'Fresh Tomatoes',
      quantity: '5kg',
      amount: '₹600',
      status: 'pending',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      key: '2',
      orderId: '#ORD-002',
      customer: 'Jane Smith',
      customerAvatar: 'JS',
      product: 'Organic Spinach',
      quantity: '2kg',
      amount: '₹200',
      status: 'shipped',
      date: '2024-01-14',
      priority: 'medium'
    },
    {
      key: '3',
      orderId: '#ORD-003',
      customer: 'Mike Johnson',
      customerAvatar: 'MJ',
      product: 'Fresh Carrots',
      quantity: '3kg',
      amount: '₹240',
      status: 'delivered',
      date: '2024-01-13',
      priority: 'low'
    },
    {
      key: '4',
      orderId: '#ORD-004',
      customer: 'Sarah Wilson',
      customerAvatar: 'SW',
      product: 'Organic Potatoes',
      quantity: '4kg',
      amount: '₹320',
      status: 'processing',
      date: '2024-01-12',
      priority: 'high'
    }
  ];

  const topProducts = [
    {
      name: 'Fresh Tomatoes',
      sales: 45,
      revenue: '₹5,400',
      growth: '+12%'
    },
    {
      name: 'Organic Spinach',
      sales: 32,
      revenue: '₹3,200',
      growth: '+8%'
    },
    {
      name: 'Fresh Carrots',
      sales: 28,
      revenue: '₹2,240',
      growth: '+15%'
    }
  ];

  const orderColumns = [
    {
      title: 'Order Details',
      key: 'orderDetails',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar size="small" style={{ backgroundColor: '#52c41a' }}>
            {record.customerAvatar}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{record.orderId}</div>
            <div className="text-sm text-gray-500">{record.customer}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product, record) => (
        <div>
          <div className="font-medium text-gray-900">{product}</div>
          <div className="text-sm text-gray-500">{record.quantity}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <div className="font-semibold text-gray-900">{amount}</div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        const statusConfig = {
          pending: { color: 'orange', icon: <ClockCircleOutlined /> },
          processing: { color: 'blue', icon: <ExclamationCircleOutlined /> },
          shipped: { color: 'cyan', icon: <EnvironmentOutlined /> },
          delivered: { color: 'green', icon: <CheckCircleOutlined /> },
          cancelled: { color: 'red', icon: <ExclamationCircleOutlined /> }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <Tag color={config.color} icon={config.icon}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <div className="text-sm text-gray-600">{date}</div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit Order">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // User menu items
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <ProtectedRoute requiredRoles={['farm_owner', 'farm_manager', 'farm_worker']}>
      <Layout className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Ultra Modern Header */}
        <Header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
                size="large"
              />
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white font-bold text-xl">K</span>
                </motion.div>
                <div>
                  <Title level={3} className="mb-0 text-gray-900 font-bold">
                    KrishiConnect
                  </Title>
                  <Text className="text-gray-500 text-sm font-medium">
                    Professional Farmer Dashboard
                  </Text>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Time Range Selector */}
              <Select
                value={selectedTimeRange}
                onChange={setSelectedTimeRange}
                className="w-32"
                size="large"
              >
                <Select.Option value="7d">Last 7 days</Select.Option>
                <Select.Option value="30d">Last 30 days</Select.Option>
                <Select.Option value="90d">Last 90 days</Select.Option>
                <Select.Option value="1y">Last year</Select.Option>
              </Select>
              
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">8</div>
                  <div className="text-xs text-gray-500 font-medium">Active Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">₹45,680</div>
                  <div className="text-xs text-gray-500 font-medium">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">4.8★</div>
                  <div className="text-xs text-gray-500 font-medium">Rating</div>
                </div>
              </div>
              
              {/* Notifications */}
              <Badge count={5} size="small" offset={[-2, 2]}>
                <Button 
                  type="text" 
                  icon={<BellOutlined />}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
                  size="large"
                />
              </Badge>
              
              {/* User Menu */}
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <motion.div 
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <Avatar 
                    size="large" 
                    style={{ backgroundColor: '#52c41a' }}
                    icon={<UserOutlined />}
                    className="shadow-lg"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-semibold text-gray-900">
                      {user?.name || 'Farmer'}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">Farm Owner</div>
                  </div>
                </motion.div>
              </Dropdown>
            </div>
          </div>
        </Header>

        <Layout>
          {/* Ultra Modern Sidebar */}
          <Sider 
            width={collapsed ? 80 : 300} 
            className="bg-white/90 backdrop-blur-md shadow-xl border-r border-gray-200/50 transition-all duration-300"
            collapsed={collapsed}
          >
            <div className="p-6">
              <nav className="space-y-3">
                <Link 
                  href="/farmer" 
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 ${
                    true ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChartOutlined className="text-xl" />
                  {!collapsed && <span className="font-semibold">Dashboard</span>}
                </Link>
                
                <Link 
                  href="/farmer/products" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <AppstoreOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Products</span>}
                </Link>
                
                <Link 
                  href="/farmer/orders" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <FileTextOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Orders</span>}
                </Link>
                
                <Link 
                  href="/farmer/analytics" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <RiseOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Analytics</span>}
                </Link>
                
                <Link 
                  href="/farmer/finances" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <WalletOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Finances</span>}
                </Link>
                
                <Link 
                  href="/farmer/customers" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <UserOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Customers</span>}
                </Link>
                
                <Link 
                  href="/farmer/staff" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <TeamOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Staff</span>}
                </Link>
                
                <Link 
                  href="/farmer/marketing" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <RocketOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Marketing</span>}
                </Link>
                
                <Link 
                  href="/farmer/settings" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <SettingOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Settings</span>}
                </Link>
              </nav>
              
              {/* Quick Actions */}
              {!collapsed && (
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="text-sm font-semibold text-blue-900 mb-3">Quick Actions</div>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />}
                      size="small"
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={() => setShowAddProduct(true)}
                    >
                      Add Product
                    </Button>
                    <Button 
                      icon={<DownloadOutlined />}
                      size="small"
                      className="w-full"
                    >
                      Export Data
                    </Button>
                  </Space>
                </div>
              )}
            </div>
          </Sider>

          {/* Main Content */}
          <Content className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Welcome Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="max-w-2xl">
                    <motion.h1 
                      className="text-4xl font-bold mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Welcome back, {user?.name || 'Farmer'}! 🌱
                    </motion.h1>
                    <motion.p 
                      className="text-green-100 mb-6 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Your farm is thriving! Here's what's happening today.
                    </motion.p>
                    <motion.div 
                      className="flex items-center space-x-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircleOutlined className="text-green-200 text-xl" />
                        <span className="font-semibold">8 orders pending</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RiseOutlined className="text-green-200 text-xl" />
                        <span className="font-semibold">+15% revenue growth</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StarOutlined className="text-green-200 text-xl" />
                        <span className="font-semibold">4.8★ customer rating</span>
                      </div>
                    </motion.div>
                  </div>
                  <div className="hidden lg:block">
                    <motion.div 
                      className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <BarChartOutlined className="text-6xl text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dashboard Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: 'overview',
                    label: (
                      <span className="flex items-center space-x-2">
                        <BarChartOutlined />
                        <span>Overview</span>
                      </span>
                    ),
                  },
                  {
                    key: 'analytics',
                    label: (
                      <span className="flex items-center space-x-2">
                        <RiseOutlined />
                        <span>Analytics</span>
                      </span>
                    ),
                  },
                  {
                    key: 'products',
                    label: (
                      <span className="flex items-center space-x-2">
                        <AppstoreOutlined />
                        <span>Products</span>
                      </span>
                    ),
                  },
                  {
                    key: 'orders',
                    label: (
                      <span className="flex items-center space-x-2">
                        <FileTextOutlined />
                        <span>Orders</span>
                      </span>
                    ),
                  },
                ]}
                className="modern-tabs"
              />
            </motion.div>

            {/* Ultra Modern Stats Cards */}
            <AnimatePresence>
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Row gutter={[24, 24]} className="mb-8">
                    {stats.map((stat, index) => (
                      <Col xs={24} sm={12} lg={8} xl={4} key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <Card 
                            className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm"
                            bodyStyle={{ padding: '28px' }}
                          >
                            <div className="relative">
                              <div 
                                className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5"
                                style={{ background: stat.bgColor }}
                              />
                              <div className="flex items-start justify-between mb-6">
                                <div 
                                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl"
                                  style={{ background: stat.bgColor }}
                                >
                                  {stat.icon}
                                </div>
                                <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                                  {stat.changeType === 'increase' ? (
                                    <ArrowUpOutlined className="text-green-500 text-sm" />
                                  ) : (
                                    <ArrowDownOutlined className="text-red-500 text-sm" />
                                  )}
                                  <span 
                                    className={`text-sm font-semibold ${
                                      stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                                    }`}
                                  >
                                    {stat.change}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">
                                  {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                                </div>
                                <div className="text-gray-700 font-semibold text-lg mb-1">{stat.title}</div>
                                <div className="text-gray-500 text-sm">{stat.description}</div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </motion.div>
              )}
            </AnimatePresence>

            <Row gutter={[24, 24]}>
              {/* Recent Orders */}
              <Col xs={24} lg={16}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card
                    title={
                      <div className="flex items-center space-x-2">
                        <FileTextOutlined className="text-green-500" />
                        <span className="text-lg font-semibold">Recent Orders</span>
                      </div>
                    }
                    extra={
                      <Link href="/farmer/orders">
                        <Button type="primary" size="small">
                          View All
                        </Button>
                      </Link>
                    }
                    className="h-full border-0 shadow-lg"
                    bodyStyle={{ padding: '24px' }}
                  >
                    <Table
                      columns={orderColumns}
                      dataSource={recentOrders}
                      pagination={false}
                      size="middle"
                      className="modern-table"
                    />
                  </Card>
                </motion.div>
              </Col>

              {/* Top Products & Quick Actions */}
              <Col xs={24} lg={8}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* Top Products */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Card
                      title={
                        <div className="flex items-center space-x-2">
                          <TrophyOutlined className="text-yellow-500" />
                          <span className="text-lg font-semibold">Top Products</span>
                        </div>
                      }
                      className="border-0 shadow-lg"
                      bodyStyle={{ padding: '24px' }}
                    >
                      <List
                        dataSource={topProducts}
                        renderItem={(item, index) => (
                          <List.Item className="border-0 py-3">
                            <div className="w-full">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold text-sm">#{index + 1}</span>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">{item.sales} sales</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">{item.revenue}</div>
                                  <div className="text-sm text-green-600 font-medium">{item.growth}</div>
                                </div>
                              </div>
                              <Progress 
                                percent={(item.sales / 50) * 100} 
                                size="small" 
                                showInfo={false}
                                strokeColor="#52c41a"
                                trailColor="#f0f0f0"
                              />
                            </div>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Card
                      title={
                        <div className="flex items-center space-x-2">
                          <PlusOutlined className="text-green-500" />
                          <span className="text-lg font-semibold">Quick Actions</span>
                        </div>
                      }
                      className="border-0 shadow-lg"
                      bodyStyle={{ padding: '24px' }}
                    >
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Link href="/farmer/products/new">
                          <Button 
                            type="primary" 
                            icon={<PlusOutlined />}
                            size="large"
                            className="w-full h-12 bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                          >
                            Add New Product
                          </Button>
                        </Link>
                        <Button 
                          icon={<EyeOutlined />} 
                          size="large"
                          className="w-full h-12"
                        >
                          View All Orders
                        </Button>
                        <Button 
                          icon={<RiseOutlined />} 
                          size="large"
                          className="w-full h-12"
                        >
                          View Analytics
                        </Button>
                        <Button 
                          icon={<WalletOutlined />} 
                          size="large"
                          className="w-full h-12"
                        >
                          Request Payout
                        </Button>
                      </Space>
                    </Card>
                  </motion.div>
                </Space>
              </Col>
            </Row>

            {/* Add Product Modal */}
            <Modal
              title="Add New Product"
              open={showAddProduct}
              onCancel={() => setShowAddProduct(false)}
              footer={null}
              width={600}
              className="modern-modal"
            >
              <Form layout="vertical" className="space-y-4">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
                      <Input placeholder="Enter product name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                      <Select placeholder="Select category" size="large">
                        <Select.Option value="vegetables">Vegetables</Select.Option>
                        <Select.Option value="fruits">Fruits</Select.Option>
                        <Select.Option value="grains">Grains</Select.Option>
                        <Select.Option value="herbs">Herbs</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Price (₹)" name="price" rules={[{ required: true }]}>
                      <Input placeholder="Enter price" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Stock Quantity" name="stock" rules={[{ required: true }]}>
                      <Input placeholder="Enter stock" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} placeholder="Enter product description" />
                </Form.Item>
                <div className="flex justify-end space-x-3">
                  <Button onClick={() => setShowAddProduct(false)}>
                    Cancel
                  </Button>
                  <Button type="primary" className="bg-green-500 hover:bg-green-600">
                    Add Product
                  </Button>
                </div>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
}
