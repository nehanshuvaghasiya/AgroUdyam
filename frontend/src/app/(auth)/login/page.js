'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Divider, 
  Space,
  Alert,
  Select,
  Row,
  Col
} from '@/components/ui';
import { Typography, Checkbox } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  FacebookOutlined,
  AppleOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  StarOutlined,
  RocketOutlined,
  BulbOutlined,
  CrownOutlined,
  GiftOutlined,
  ExperimentOutlined,
  FireOutlined,
  GlobalOutlined,
  PhoneOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  TeamOutlined,
  WalletOutlined,
  BarChartOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const { Title, Text, Paragraph } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [form] = Form.useForm();
  const { login } = useAuth();
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login({ ...values, userType });
      if (result.success) {
        toast.success('Login successful!');
        // Redirect will be handled by AuthContext
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <ThunderboltOutlined />, text: 'Fast Delivery', color: 'text-yellow-500' },
    { icon: <SafetyOutlined />, text: 'Quality Assured', color: 'text-green-500' },
    { icon: <HeartOutlined />, text: 'Support Farmers', color: 'text-red-500' },
    { icon: <StarOutlined />, text: 'Premium Quality', color: 'text-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full opacity-10"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <Row gutter={[48, 48]} className="items-center">
          {/* Left Side - Branding & Features */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-2xl"
              >
                <span className="text-white font-bold text-3xl">K</span>
              </motion.div>

              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                KrishiConnect
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Connect directly with local farmers and get fresh, organic produce delivered to your doorstep.
              </motion.p>

              {/* Features */}
              <motion.div 
                className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`text-2xl ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <span className="font-semibold text-gray-800">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="mt-12 grid grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600 font-medium">Farmers Connected</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-gray-600 font-medium">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>
          </Col>

          {/* Right Side - Login Form */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <Title level={2} className="text-gray-900 mb-2 font-bold">
                      Welcome Back! 👋
                    </Title>
                    <Paragraph className="text-gray-600 text-lg">
                      Sign in to continue your journey
                    </Paragraph>
                  </div>

                  {/* User Type Selection */}
                  <div className="mb-6">
                    <Select
                      value={userType}
                      onChange={setUserType}
                      className="w-full"
                      size="large"
                    >
                      <Select.Option value="customer">
                        <div className="flex items-center space-x-2">
                          <ShopOutlined />
                          <span>Customer</span>
                        </div>
                      </Select.Option>
                      <Select.Option value="farmer">
                        <div className="flex items-center space-x-2">
                          <EnvironmentOutlined />
                          <span>Farmer</span>
                        </div>
                      </Select.Option>
                    </Select>
                  </div>

                  {/* Login Form */}
                  <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    className="space-y-6"
                  >
                    <Form.Item
                      name="email"
                      label="Email Address"
                      rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        placeholder="Enter your email"
                        className="h-14 rounded-xl"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        { required: true, message: 'Please enter your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' }
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Enter your password"
                        className="h-14 rounded-xl"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Form.Item>

                    <div className="flex items-center justify-between">
                      <Form.Item name="remember" valuePropName="checked" className="mb-0">
                        <Checkbox className="font-medium">Remember me</Checkbox>
                      </Form.Item>
                      <Link 
                        href="/forgot-password" 
                        className="text-green-600 hover:text-green-700 font-semibold"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Form.Item className="mb-0">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 font-bold text-lg rounded-xl shadow-lg"
                        icon={<ArrowRightOutlined />}
                      >
                        Sign In
                      </Button>
                    </Form.Item>
                  </Form>

                  {/* Divider */}
                  <Divider className="my-8">
                    <Text className="text-gray-500 font-medium">or continue with</Text>
                  </Divider>

                  {/* Social Login */}
                  <Space direction="vertical" className="w-full" size="middle">
                    <Button
                      className="w-full h-12 border-gray-300 hover:border-gray-400 rounded-xl font-medium"
                      icon={<GoogleOutlined className="text-red-500" />}
                    >
                      Continue with Google
                    </Button>
                    <Button
                      className="w-full h-12 border-gray-300 hover:border-gray-400 rounded-xl font-medium"
                      icon={<FacebookOutlined className="text-blue-500" />}
                    >
                      Continue with Facebook
                    </Button>
                  </Space>

                  {/* Sign Up Link */}
                  <div className="text-center mt-8">
                    <Text className="text-gray-600 text-lg">
                      Don't have an account?{' '}
                      <Link 
                        href="/register" 
                        className="text-green-600 hover:text-green-700 font-bold"
                      >
                        Sign up here
                      </Link>
                    </Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
