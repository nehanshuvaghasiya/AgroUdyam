'use client';

import { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Button, 
  Table, 
  Space,
  Modal,
  Form,
  Input,
  Select,
  message
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
  Tabs,
  Spin,
  Upload
} from 'antd';
import { 
  ShoppingCartOutlined,
  DollarOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  RiseOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  FileTextOutlined,
  WalletOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  StarOutlined,
  UserOutlined,
  AppstoreOutlined,
  TeamOutlined,
  DownloadOutlined,
  TrophyOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { productService } from '@/services/product.service';
import { orderService } from '@/services/order.service';
import { walletService } from '@/services/wallet.service';
import { farmService } from '@/services/farm.service';
import './dashboard.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export default function FarmerDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  // Real data states
  const [stats, setStats] = useState({
    totalProducts: 0,
    monthlySales: 0,
    activeOrders: 0,
    totalRevenue: 0,
    rating: 0,
    farmVisits: 0
  });
  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  
  const [productForm] = Form.useForm();

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch products
      const productsRes = await productService.getFarmerProducts({ limit: 100 });
      if (productsRes.success) {
        setProducts(productsRes.data.products || []);
        setStats(prev => ({ ...prev, totalProducts: productsRes.data.products?.length || 0 }));
        
        // Calculate top products
        const sortedProducts = [...(productsRes.data.products || [])]
          .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
          .slice(0, 3);
        setTopProducts(sortedProducts);
      }

      // Fetch orders
      const ordersRes = await orderService.getFarmerOrders({ limit: 10 });
      if (ordersRes.success) {
        setRecentOrders(ordersRes.data.orders || []);
        
        // Calculate stats from orders
        const orders = ordersRes.data.orders || [];
        const activeCount = orders.filter(o => ['pending', 'confirmed', 'processing'].includes(o.status)).length;
        const monthlyOrders = orders.filter(o => {
          const orderDate = new Date(o.createdAt);
          const now = new Date();
          return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
        });
        
        const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        setStats(prev => ({ 
          ...prev, 
          activeOrders: activeCount,
          monthlySales: monthlyOrders.length,
          totalRevenue: monthlyRevenue,
          rating: 4.8 // Mock rating for now
        }));
      }

      // Fetch wallet balance
      const walletRes = await walletService.getWalletBalance();
      if (walletRes.success) {
        setWalletBalance(walletRes.data.balance || 0);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Handle product creation
  const handleCreateProduct = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'images' && values[key]) {
          values[key].fileList.forEach(file => {
            formData.append('images', file.originFileObj);
          });
        } else {
          formData.append(key, values[key]);
        }
      });

      const result = await productService.createProduct(formData);
      if (result.success) {
        message.success('Product created successfully!');
        setShowAddProduct(false);
        productForm.resetFields();
        fetchDashboardData();
      } else {
        message.error(result.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      message.error('Failed to create product');
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const result = await productService.deleteProduct(productId);
      if (result.success) {
        message.success('Product deleted successfully!');
        fetchDashboardData();
      } else {
        message.error(result.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product');
    }
  };

  // Handle order status update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const result = await orderService.updateOrderStatus(orderId, { status: newStatus });
      if (result.success) {
        message.success('Order status updated successfully!');
        fetchDashboardData();
      } else {
        message.error(result.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  // Enhanced stats data with real values
  const statsCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      change: '+12%',
      changeType: 'increase',
      icon: <AppstoreOutlined />,
      color: '#52c41a',
      bgColor: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
      description: 'Active products in your store'
    },
    {
      title: 'Monthly Sales',
      value: stats.monthlySales,
      change: '+8%',
      changeType: 'increase',
      icon: <DollarOutlined />,
      color: '#1890ff',
      bgColor: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
      description: 'Orders completed this month'
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      change: '-2%',
      changeType: 'decrease',
      icon: <ClockCircleOutlined />,
      color: '#fa8c16',
      bgColor: 'linear-gradient(135deg, #fa8c16 0%, #ffa940 100%)',
      description: 'Orders pending fulfillment'
    },
    {
      title: 'Total Revenue',
      value: stats.totalRevenue,
      prefix: '₹',
      change: '+15%',
      changeType: 'increase',
      icon: <RiseOutlined />,
      color: '#722ed1',
      bgColor: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
      description: 'Revenue generated this month'
    },
    {
      title: 'Wallet Balance',
      value: walletBalance,
      prefix: '₹',
      change: '+10%',
      changeType: 'increase',
      icon: <WalletOutlined />,
      color: '#13c2c2',
      bgColor: 'linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%)',
      description: 'Available balance in wallet'
    },
    {
      title: 'Customer Rating',
      value: stats.rating,
      suffix: '/5',
      change: '+0.2',
      changeType: 'increase',
      icon: <StarOutlined />,
      color: '#f59e0b',
      bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      description: 'Average customer satisfaction'
    }
  ];

  const orderColumns = [
    {
      title: 'Order Details',
      key: 'orderDetails',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar size="small" style={{ backgroundColor: '#52c41a' }}>
            {record.customer?.name?.charAt(0) || 'U'}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">#{record._id?.slice(-8)}</div>
            <div className="text-sm text-gray-500">{record.customer?.name || 'Customer'}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <div>
          <div className="font-medium text-gray-900">{products?.length || 0} items</div>
          <div className="text-sm text-gray-500">
            {products?.[0]?.product?.name || 'Multiple products'}
          </div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => (
        <div className="font-semibold text-gray-900">₹{amount?.toLocaleString() || 0}</div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          pending: { color: 'orange', icon: <ClockCircleOutlined /> },
          confirmed: { color: 'blue', icon: <ExclamationCircleOutlined /> },
          processing: { color: 'cyan', icon: <ExclamationCircleOutlined /> },
          shipped: { color: 'purple', icon: <EnvironmentOutlined /> },
          delivered: { color: 'green', icon: <CheckCircleOutlined /> },
          cancelled: { color: 'red', icon: <ExclamationCircleOutlined /> }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <Tag color={config.color} icon={config.icon}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </Tag>
        );
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <div className="text-sm text-gray-600">
          {date ? new Date(date).toLocaleDateString() : 'N/A'}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => router.push(`/farmer/orders/${record._id}`)}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'confirmed',
                  label: 'Mark as Confirmed',
                  onClick: () => handleUpdateOrderStatus(record._id, 'confirmed'),
                },
                {
                  key: 'processing',
                  label: 'Mark as Processing',
                  onClick: () => handleUpdateOrderStatus(record._id, 'processing'),
                },
                {
                  key: 'shipped',
                  label: 'Mark as Shipped',
                  onClick: () => handleUpdateOrderStatus(record._id, 'shipped'),
                },
              ],
            }}
          >
            <Button type="text" icon={<SettingOutlined />} size="small" />
          </Dropdown>
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
      onClick: () => router.push('/farmer/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/farmer/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Spin size="large" />
      </div>
    );
  }

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
                  <span className="text-white font-bold text-xl">A</span>
                </motion.div>
                <div>
                  <Title level={3} className="mb-0 text-gray-900 font-bold">
                    AgroUdyam
                  </Title>
                  <Text className="text-gray-500 text-sm font-medium">
                    Professional Farmer Dashboard
                  </Text>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{stats.activeOrders}</div>
                  <div className="text-xs text-gray-500 font-medium">Active Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 font-medium">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{stats.rating}★</div>
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
            width={collapsed ? 80 : 280} 
            className="bg-white/90 backdrop-blur-md shadow-xl border-r border-gray-200/50 transition-all duration-300"
            collapsed={collapsed}
          >
            <div className="p-6">
              <nav className="space-y-3">
                <Link 
                  href="/farmer" 
                  className="flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
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
                  href="/farmer/wallet" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <WalletOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Wallet</span>}
                </Link>
                
                <Link 
                  href="/farmer/farm" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <EnvironmentOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Farm</span>}
                </Link>
                
                <Link 
                  href="/farmer/staff" 
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <TeamOutlined className="text-xl" />
                  {!collapsed && <span className="font-medium">Staff</span>}
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
                        <span className="font-semibold">{stats.activeOrders} orders pending</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RiseOutlined className="text-green-200 text-xl" />
                        <span className="font-semibold">+15% revenue growth</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StarOutlined className="text-green-200 text-xl" />
                        <span className="font-semibold">{stats.rating}★ customer rating</span>
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

            {/* Ultra Modern Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Row gutter={[24, 24]} className="mb-8">
                {statsCards.map((stat, index) => (
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
                              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl text-2xl"
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
                    {recentOrders.length > 0 ? (
                      <Table
                        columns={orderColumns}
                        dataSource={recentOrders}
                        pagination={false}
                        size="middle"
                        className="modern-table"
                        rowKey="_id"
                      />
                    ) : (
                      <div className="text-center py-12">
                        <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
                        <p className="text-gray-500">No orders yet</p>
                      </div>
                    )}
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
                      {topProducts.length > 0 ? (
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
                                      <div className="text-sm text-gray-500">{item.salesCount || 0} sales</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-900">₹{item.price}</div>
                                  </div>
                                </div>
                                <Progress 
                                  percent={((item.salesCount || 0) / 50) * 100} 
                                  size="small" 
                                  showInfo={false}
                                  strokeColor="#52c41a"
                                  trailColor="#f0f0f0"
                                />
                              </div>
                            </List.Item>
                          )}
                        />
                      ) : (
                        <div className="text-center py-8">
                          <AppstoreOutlined className="text-6xl text-gray-300 mb-4" />
                          <p className="text-gray-500">No products yet</p>
                        </div>
                      )}
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
                        <Button 
                          type="primary" 
                          icon={<PlusOutlined />}
                          size="large"
                          className="w-full h-12 bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                          onClick={() => setShowAddProduct(true)}
                        >
                          Add New Product
                        </Button>
                        <Button 
                          icon={<EyeOutlined />} 
                          size="large"
                          className="w-full h-12"
                          onClick={() => router.push('/farmer/orders')}
                        >
                          View All Orders
                        </Button>
                        <Button 
                          icon={<WalletOutlined />} 
                          size="large"
                          className="w-full h-12"
                          onClick={() => router.push('/farmer/wallet')}
                        >
                          Manage Wallet
                        </Button>
                      </Space>
                    </Card>
                  </motion.div>
                </Space>
              </Col>
            </Row>

            {/* Add Product Modal */}
            <Modal
              title={
                <div className="flex items-center space-x-2">
                  <PlusOutlined className="text-green-500" />
                  <span>Add New Product</span>
                </div>
              }
              open={showAddProduct}
              onCancel={() => {
                setShowAddProduct(false);
                productForm.resetFields();
              }}
              footer={null}
              width={700}
              className="modern-modal"
            >
              <Form 
                form={productForm}
                layout="vertical" 
                onFinish={handleCreateProduct}
                className="space-y-4"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item 
                      label="Product Name" 
                      name="name" 
                      rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                      <Input placeholder="Enter product name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item 
                      label="Category" 
                      name="category" 
                      rules={[{ required: true, message: 'Please select category' }]}
                    >
                      <Select placeholder="Select category" size="large">
                        <Select.Option value="vegetables">Vegetables</Select.Option>
                        <Select.Option value="fruits">Fruits</Select.Option>
                        <Select.Option value="grains">Grains</Select.Option>
                        <Select.Option value="herbs">Herbs</Select.Option>
                        <Select.Option value="dairy">Dairy</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item 
                      label="Price (₹)" 
                      name="price" 
                      rules={[{ required: true, message: 'Please enter price' }]}
                    >
                      <Input type="number" placeholder="Enter price" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item 
                      label="Quantity" 
                      name="quantity" 
                      rules={[{ required: true, message: 'Please enter quantity' }]}
                    >
                      <Input type="number" placeholder="Enter quantity" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item 
                      label="Unit" 
                      name="unit" 
                      rules={[{ required: true, message: 'Please select unit' }]}
                    >
                      <Select placeholder="Select unit" size="large">
                        <Select.Option value="kg">Kilogram (kg)</Select.Option>
                        <Select.Option value="g">Gram (g)</Select.Option>
                        <Select.Option value="l">Liter (l)</Select.Option>
                        <Select.Option value="piece">Piece</Select.Option>
                        <Select.Option value="bunch">Bunch</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} placeholder="Enter product description" />
                </Form.Item>
                <Form.Item label="Tags (comma separated)" name="tags">
                  <Input placeholder="organic, fresh, local" />
                </Form.Item>
                <Form.Item label="Product Images" name="images">
                  <Upload
                    listType="picture-card"
                    maxCount={5}
                    beforeUpload={() => false}
                  >
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button onClick={() => {
                    setShowAddProduct(false);
                    productForm.resetFields();
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Create Product
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
