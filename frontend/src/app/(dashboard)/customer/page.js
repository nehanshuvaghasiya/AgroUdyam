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
  Progress
} from 'antd';
import { 
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
  EyeOutlined,
  TruckOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  // Mock data for demonstration
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: '₹1,200',
      items: 3,
      farmer: 'John Farmer'
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      status: 'shipped',
      total: '₹800',
      items: 2,
      farmer: 'Sarah Grower'
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'processing',
      total: '₹600',
      items: 1,
      farmer: 'Mike Gardner'
    }
  ];

  const favoriteProducts = [
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      price: '₹120/kg',
      image: '/images/placeholder-product.jpg',
      farmer: 'John Farmer',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Sweet Mangoes',
      price: '₹200/kg',
      image: '/images/placeholder-product.jpg',
      farmer: 'Sarah Grower',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Fresh Carrots',
      price: '₹80/kg',
      image: '/images/placeholder-product.jpg',
      farmer: 'Mike Gardner',
      rating: 4.3
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'green',
      shipped: 'blue',
      processing: 'orange',
      cancelled: 'red'
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: <CheckCircleOutlined />,
      shipped: <TruckOutlined />,
      processing: <ClockCircleOutlined />,
      cancelled: <UserOutlined />
    };
    return icons[status] || <ClockCircleOutlined />;
  };

  return (
    <ProtectedRoute requiredRoles={['customer']}>
      <Layout className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header className="bg-white shadow-sm border-b border-gray-200 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <Title level={4} className="mb-0 text-gray-900">
                  Customer Dashboard
                </Title>
                <Text className="text-gray-600">
                  Welcome back, {user?.name || 'Customer'}!
                </Text>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Badge count={cartItemCount} size="small">
                  <Button type="text" icon={<ShoppingCartOutlined />}>
                    Cart
                  </Button>
                </Badge>
              </Link>
              <Avatar size="large" icon={<UserOutlined />} />
            </div>
          </div>
        </Header>

        <Layout>
          {/* Sidebar */}
          <Sider width={250} className="bg-white shadow-sm">
            <div className="p-6">
              <nav className="space-y-2">
                <Link href="/customer" className="block p-3 rounded-lg bg-green-50 text-green-700 font-medium">
                  Dashboard
                </Link>
                <Link href="/products" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  Browse Products
                </Link>
                <Link href="/customer/orders" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  My Orders
                </Link>
                <Link href="/customer/favorites" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  Favorites
                </Link>
                <Link href="/customer/reviews" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  My Reviews
                </Link>
                <Link href="/customer/addresses" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  Addresses
                </Link>
                <Link href="/customer/settings" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  Settings
                </Link>
              </nav>
            </div>
          </Sider>

          {/* Main Content */}
          <Content className="p-6">
            {/* Quick Stats */}
            <Row gutter={[24, 24]} className="mb-8">
              <Col xs={24} sm={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="text-center">
                    <div className="text-3xl text-green-500 mb-2">
                      <ShoppingCartOutlined />
                    </div>
                    <Title level={3} className="text-gray-900 mb-1">12</Title>
                    <Text className="text-gray-600">Total Orders</Text>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} sm={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="text-center">
                    <div className="text-3xl text-red-500 mb-2">
                      <HeartOutlined />
                    </div>
                    <Title level={3} className="text-gray-900 mb-1">8</Title>
                    <Text className="text-gray-600">Favorite Products</Text>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} sm={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="text-center">
                    <div className="text-3xl text-yellow-500 mb-2">
                      <StarOutlined />
                    </div>
                    <Title level={3} className="text-gray-900 mb-1">4.7</Title>
                    <Text className="text-gray-600">Average Rating</Text>
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
                    title="Recent Orders"
                    extra={
                      <Link href="/customer/orders">
                        <Button type="link">View All</Button>
                      </Link>
                    }
                    className="h-full"
                  >
                    <List
                      dataSource={recentOrders}
                      renderItem={(order) => (
                        <List.Item
                          actions={[
                            <Button type="link" icon={<EyeOutlined />} size="small">
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
                                <Text strong>Order #{order.id}</Text>
                                <Tag color={getStatusColor(order.status)}>
                                  {order.status.toUpperCase()}
                                </Tag>
                              </div>
                            }
                            description={
                              <div>
                                <Text className="block text-gray-600">
                                  {order.items} items • {order.farmer}
                                </Text>
                                <Text className="text-sm text-gray-500">
                                  {order.date} • Total: {order.total}
                                </Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
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
                    title="Favorite Products"
                    extra={
                      <Link href="/customer/favorites">
                        <Button type="link">View All</Button>
                      </Link>
                    }
                    className="h-full"
                  >
                    <List
                      dataSource={favoriteProducts}
                      renderItem={(product) => (
                        <List.Item
                          actions={[
                            <Button type="link" icon={<EyeOutlined />} size="small">
                              View
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar 
                                shape="square" 
                                size={48}
                                src={product.image}
                                className="rounded-lg"
                              />
                            }
                            title={
                              <div className="flex items-center justify-between">
                                <Text strong>{product.name}</Text>
                                <div className="flex items-center space-x-1">
                                  <StarOutlined className="text-yellow-500 text-sm" />
                                  <Text className="text-sm">{product.rating}</Text>
                                </div>
                              </div>
                            }
                            description={
                              <div>
                                <Text className="block text-gray-600">
                                  {product.farmer}
                                </Text>
                                <Text className="text-sm font-medium text-green-600">
                                  {product.price}
                                </Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </motion.div>
              </Col>
            </Row>

            {/* Quick Actions */}
            <Row gutter={[24, 24]} className="mt-6">
              <Col xs={24}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card title="Quick Actions">
                    <Space wrap>
                      <Link href="/products">
                        <Button 
                          type="primary" 
                          icon={<ShoppingCartOutlined />}
                          className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                        >
                          Browse Products
                        </Button>
                      </Link>
                      <Link href="/customer/orders">
                        <Button icon={<TruckOutlined />}>
                          Track Orders
                        </Button>
                      </Link>
                      <Link href="/customer/favorites">
                        <Button icon={<HeartOutlined />}>
                          View Favorites
                        </Button>
                      </Link>
                      <Link href="/customer/reviews">
                        <Button icon={<StarOutlined />}>
                          Write Review
                        </Button>
                      </Link>
                    </Space>
                  </Card>
                </motion.div>
              </Col>
            </Row>

            {/* Recommendations */}
            <Row gutter={[24, 24]} className="mt-6">
              <Col xs={24}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card title="Recommended for You">
                    <div className="text-center py-8">
                      <div className="text-4xl text-gray-400 mb-4">
                        <ShoppingCartOutlined />
                      </div>
                      <Text className="text-gray-600">
                        Based on your purchase history, we recommend checking out our fresh vegetables section.
                      </Text>
                      <div className="mt-4">
                        <Link href="/products?category=vegetables">
                          <Button 
                            type="primary"
                            className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                          >
                            Explore Vegetables
                          </Button>
                        </Link>
                      </div>
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
