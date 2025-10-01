'use client';

import { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  List,
  Avatar,
  Badge,
  Space,
  Tag,
  message,
  Spin
} from 'antd';
import { 
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
  EyeOutlined,
  TruckOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { orderService } from '@/services/order.service';
import { productService } from '@/services/product.service';
import { userService } from '@/services/user.service';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    favoriteProducts: 0,
    avgRating: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const cartItemCount = getItemCount();

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch recent orders
      const ordersRes = await orderService.getUserOrders({ limit: 5 });
      if (ordersRes.success) {
        const orders = ordersRes.data.orders || [];
        setRecentOrders(orders);
        setStats(prev => ({ ...prev, totalOrders: ordersRes.data.pagination?.total || 0 }));
      }

      // Fetch featured products as favorites (mock)
      const productsRes = await productService.getAllProducts({ limit: 3 });
      if (productsRes.success) {
        setFavoriteProducts(productsRes.data.products || []);
        setStats(prev => ({ ...prev, favoriteProducts: productsRes.data.products?.length || 0 }));
      }

      // Get user stats
      try {
        const statsRes = await userService.getUserStats();
        if (statsRes.success) {
          setStats(prev => ({ ...prev, ...statsRes.data }));
        }
      } catch (error) {
        console.log('Stats not available');
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
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

  const getStatusIcon = (status) => {
    const icons = {
      pending: <ClockCircleOutlined />,
      confirmed: <CheckCircleOutlined />,
      processing: <ClockCircleOutlined />,
      shipped: <TruckOutlined />,
      delivered: <CheckCircleOutlined />,
      cancelled: <UserOutlined />
    };
    return icons[status] || <ClockCircleOutlined />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRoles={['customer']}>
      <Layout className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <Header className="bg-white shadow-lg border-b border-gray-200 px-6 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <span className="text-white font-bold text-xl">A</span>
              </motion.div>
              <div>
                <Title level={3} className="mb-0 text-gray-900 font-bold">
                  AgroUdyam
                </Title>
                <Text className="text-gray-500 text-sm font-medium">
                  Welcome back, {user?.name || 'Customer'}!
                </Text>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button type="text" icon={<AppstoreOutlined />}>
                  Browse Products
                </Button>
              </Link>
              <Link href="/cart">
                <Badge count={cartItemCount} size="small">
                  <Button type="text" icon={<ShoppingCartOutlined />}>
                    Cart
                  </Button>
                </Badge>
              </Link>
              <Badge count={3} size="small" offset={[-2, 2]}>
                <Button 
                  type="text" 
                  icon={<BellOutlined />}
                  className="text-gray-600"
                />
              </Badge>
              <Button 
                type="text" 
                icon={<SettingOutlined />}
                onClick={() => router.push('/customer/settings')}
              />
              <Button 
                type="text" 
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              />
              <Avatar 
                size="large" 
                icon={<UserOutlined />}
                className="cursor-pointer"
                style={{ backgroundColor: '#52c41a' }}
              />
            </div>
          </div>
        </Header>

        <Layout>
          {/* Sidebar */}
          <Sider width={280} className="bg-white shadow-lg">
            <div className="p-6">
              <nav className="space-y-2">
                <Link href="/customer" className="block p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg">
                  <UserOutlined className="mr-3" />
                  Dashboard
                </Link>
                <Link href="/products" className="block p-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all">
                  <AppstoreOutlined className="mr-3" />
                  Browse Products
                </Link>
                <Link href="/customer/orders" className="block p-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all">
                  <TruckOutlined className="mr-3" />
                  My Orders
                </Link>
                <Link href="/customer/favorites" className="block p-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all">
                  <HeartOutlined className="mr-3" />
                  Favorites
                </Link>
                <Link href="/customer/reviews" className="block p-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all">
                  <StarOutlined className="mr-3" />
                  My Reviews
                </Link>
                <Link href="/customer/settings" className="block p-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all">
                  <SettingOutlined className="mr-3" />
                  Settings
                </Link>
              </nav>

              {/* Profile Card */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="text-center">
                  <Avatar 
                    size={64} 
                    icon={<UserOutlined />}
                    className="mb-3"
                    style={{ backgroundColor: '#52c41a' }}
                  />
                  <div className="font-semibold text-gray-900 mb-1">{user?.name || 'Customer'}</div>
                  <div className="text-sm text-gray-600 mb-3">{user?.email}</div>
                  <Button size="small" onClick={() => router.push('/customer/profile')}>
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </Sider>

          {/* Main Content */}
          <Content className="p-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl"
            >
              <Title level={2} className="text-white mb-2">
                Welcome to AgroUdyam! 🌾
              </Title>
              <Text className="text-green-100 text-lg">
                Fresh produce directly from local farmers to your doorstep
              </Text>
            </motion.div>

            {/* Quick Stats */}
            <Row gutter={[24, 24]} className="mb-8">
              <Col xs={24} sm={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="text-center shadow-xl border-0 hover:shadow-2xl transition-all">
                    <div className="text-4xl text-green-500 mb-3">
                      <ShoppingCartOutlined />
                    </div>
                    <Title level={2} className="text-gray-900 mb-2">{stats.totalOrders}</Title>
                    <Text className="text-gray-600 font-medium">Total Orders</Text>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} sm={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="text-center shadow-xl border-0 hover:shadow-2xl transition-all">
                    <div className="text-4xl text-red-500 mb-3">
                      <HeartOutlined />
                    </div>
                    <Title level={2} className="text-gray-900 mb-2">{stats.favoriteProducts}</Title>
                    <Text className="text-gray-600 font-medium">Favorite Products</Text>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} sm={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="text-center shadow-xl border-0 hover:shadow-2xl transition-all">
                    <div className="text-4xl text-yellow-500 mb-3">
                      <StarOutlined />
                    </div>
                    <Title level={2} className="text-gray-900 mb-2">{stats.avgRating || '4.7'}</Title>
                    <Text className="text-gray-600 font-medium">Average Rating</Text>
                  </Card>
                </motion.div>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              {/* Recent Orders */}
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card
                    title={
                      <div className="flex items-center space-x-2">
                        <TruckOutlined className="text-green-500" />
                        <span className="text-lg font-semibold">Recent Orders</span>
                      </div>
                    }
                    extra={
                      <Link href="/customer/orders">
                        <Button type="link">View All</Button>
                      </Link>
                    }
                    className="h-full shadow-xl border-0"
                  >
                    {recentOrders.length > 0 ? (
                      <List
                        dataSource={recentOrders}
                        renderItem={(order) => (
                          <List.Item
                            actions={[
                              <Button 
                                type="link" 
                                icon={<EyeOutlined />} 
                                size="small"
                                onClick={() => router.push(`/customer/orders/${order._id}`)}
                              >
                                View
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              avatar={
                                <Avatar 
                                  icon={getStatusIcon(order.status)} 
                                  style={{ backgroundColor: getStatusColor(order.status) }}
                                />
                              }
                              title={
                                <div className="flex items-center justify-between">
                                  <Text strong>Order #{order._id?.slice(-8)}</Text>
                                  <Tag color={getStatusColor(order.status)}>
                                    {order.status?.toUpperCase()}
                                  </Tag>
                                </div>
                              }
                              description={
                                <div>
                                  <Text className="block text-gray-600">
                                    {order.products?.length || 0} items • ₹{order.totalAmount?.toLocaleString() || 0}
                                  </Text>
                                  <Text className="text-sm text-gray-500">
                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                  </Text>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingCartOutlined className="text-6xl text-gray-300 mb-4" />
                        <Text className="text-gray-500">No orders yet</Text>
                        <div className="mt-4">
                          <Link href="/products">
                            <Button type="primary" className="bg-green-500 hover:bg-green-600">
                              Start Shopping
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </Col>

              {/* Favorite Products */}
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card
                    title={
                      <div className="flex items-center space-x-2">
                        <HeartOutlined className="text-red-500" />
                        <span className="text-lg font-semibold">Featured Products</span>
                      </div>
                    }
                    extra={
                      <Link href="/products">
                        <Button type="link">View All</Button>
                      </Link>
                    }
                    className="h-full shadow-xl border-0"
                  >
                    {favoriteProducts.length > 0 ? (
                      <List
                        dataSource={favoriteProducts}
                        renderItem={(product) => (
                          <List.Item
                            actions={[
                              <Button 
                                type="link" 
                                icon={<EyeOutlined />} 
                                size="small"
                                onClick={() => router.push(`/products/${product._id}`)}
                              >
                                View
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              avatar={
                                <Avatar 
                                  shape="square" 
                                  size={56}
                                  src={product.images?.[0]?.url}
                                  className="rounded-xl"
                                  style={{ backgroundColor: '#52c41a' }}
                                >
                                  {product.name?.charAt(0)}
                                </Avatar>
                              }
                              title={
                                <div className="flex items-center justify-between">
                                  <Text strong>{product.name}</Text>
                                  <div className="flex items-center space-x-1">
                                    <StarOutlined className="text-yellow-500 text-sm" />
                                    <Text className="text-sm">{product.rating || '4.5'}</Text>
                                  </div>
                                </div>
                              }
                              description={
                                <div>
                                  <Text className="block text-gray-600">
                                    {product.farmer?.name || 'Local Farmer'}
                                  </Text>
                                  <Text className="text-sm font-semibold text-green-600">
                                    ₹{product.price}/{product.unit || 'kg'}
                                  </Text>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <AppstoreOutlined className="text-6xl text-gray-300 mb-4" />
                        <Text className="text-gray-500">No products to display</Text>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </Col>
            </Row>

            {/* Quick Actions */}
            <Row gutter={[24, 24]} className="mt-8">
              <Col xs={24}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card title="Quick Actions" className="shadow-xl border-0">
                    <Space wrap size="middle">
                      <Link href="/products">
                        <Button 
                          type="primary" 
                          icon={<ShoppingCartOutlined />}
                          size="large"
                          className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                        >
                          Browse Products
                        </Button>
                      </Link>
                      <Button 
                        icon={<TruckOutlined />}
                        size="large"
                        onClick={() => router.push('/customer/orders')}
                      >
                        Track Orders
                      </Button>
                      <Button 
                        icon={<HeartOutlined />}
                        size="large"
                        onClick={() => router.push('/customer/favorites')}
                      >
                        View Favorites
                      </Button>
                      <Button 
                        icon={<StarOutlined />}
                        size="large"
                        onClick={() => router.push('/customer/reviews')}
                      >
                        Write Review
                      </Button>
                    </Space>
                  </Card>
                </motion.div>
              </Col>
            </Row>

            {/* Recommendations */}
            <Row gutter={[24, 24]} className="mt-8">
              <Col xs={24}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card title="Recommended for You" className="shadow-xl border-0">
                    <div className="text-center py-8">
                      <div className="text-5xl text-gray-400 mb-4">
                        🌾
                      </div>
                      <Title level={4} className="text-gray-700 mb-3">
                        Discover Fresh Produce
                      </Title>
                      <Text className="text-gray-600 block mb-6">
                        Explore our wide selection of fresh fruits, vegetables, and organic products directly from local farmers.
                      </Text>
                      <Link href="/products">
                        <Button 
                          type="primary"
                          size="large"
                          className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                        >
                          Explore Products
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
}
