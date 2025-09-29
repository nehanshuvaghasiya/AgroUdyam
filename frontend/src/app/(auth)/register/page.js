'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Modal
} from '@/components/ui';
import { 
  Typography, 
  Radio,
  Steps,
  Row,
  Col,
  Checkbox,
  Progress
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  EnvironmentOutlined,
  ShopOutlined,
  TeamOutlined,
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
  CheckCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  IdcardOutlined,
  BankOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState('customer');
  const [form] = Form.useForm();
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUserType = searchParams.get('type') || 'customer';

  useEffect(() => {
    setUserType(initialUserType);
  }, [initialUserType]);

  const steps = [
    {
      title: 'Account Type',
      description: 'Choose your role',
      icon: <UserOutlined />
    },
    {
      title: 'Personal Info',
      description: 'Basic information',
      icon: <IdcardOutlined />
    },
    {
      title: 'Contact Details',
      description: 'Address & contact',
      icon: <HomeOutlined />
    },
    {
      title: 'Complete',
      description: 'Review & submit',
      icon: <CheckCircleOutlined />
    }
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        ...values,
        role: userType === 'farmer' ? 'farmer' : 'customer',
        userType: userType
      };
      
      const result = await register(userData);
      if (result.success) {
        toast.success('Registration successful!');
        // Redirect will be handled by AuthContext
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      form.validateFields().then(() => {
        setCurrentStep(currentStep + 1);
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const userTypeOptions = [
    {
      value: 'customer',
      title: 'Customer',
      description: 'Buy fresh produce from local farmers',
      icon: <ShopOutlined className="text-4xl text-blue-500" />,
      features: ['Fresh produce delivery', 'Direct farmer connection', 'Quality guarantee', 'Easy ordering']
    },
    {
      value: 'farmer',
      title: 'Farmer',
      description: 'Sell your produce directly to customers',
      icon: <EnvironmentOutlined className="text-4xl text-green-500" />,
      features: ['Direct customer sales', 'Fair pricing', 'Market reach', 'Easy management']
    }
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
          {/* Left Side - Branding */}
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
                Join KrishiConnect
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {userType === 'farmer' 
                  ? 'Start selling your fresh produce directly to customers and grow your business.'
                  : 'Get fresh, organic produce delivered from local farmers to your doorstep.'
                }
              </motion.p>

              {/* Benefits */}
              <motion.div 
                className="space-y-4 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {userTypeOptions.find(option => option.value === userType)?.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <CheckCircleOutlined className="text-green-500 text-lg" />
                    <span className="font-medium text-gray-800">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Col>

          {/* Right Side - Registration Form */}
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
                      Create Your Account
                    </Title>
                    <Paragraph className="text-gray-600 text-lg">
                      Join thousands of farmers and customers
                    </Paragraph>
                  </div>

                  {/* Progress */}
                  <div className="mb-8">
                    <Progress 
                      percent={(currentStep + 1) * 25} 
                      showInfo={false}
                      strokeColor="#52c41a"
                      trailColor="#f0f0f0"
                    />
                    <div className="text-center mt-2">
                      <Text className="text-sm text-gray-500">
                        Step {currentStep + 1} of {steps.length}
                      </Text>
                    </div>
                  </div>

                  {/* Steps */}
                  <Steps
                    current={currentStep}
                    items={steps}
                    className="mb-8"
                  />

                  {/* Registration Form */}
                  <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    className="space-y-6"
                  >
                    <AnimatePresence mode="wait">
                      {/* Step 1: Account Type */}
                      {currentStep === 0 && (
                        <motion.div
                          key="step-0"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Title level={4} className="mb-6 text-center">Choose Your Account Type</Title>
                          <Radio.Group 
                            value={userType} 
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full"
                          >
                            <Space direction="vertical" size="large" className="w-full">
                              {userTypeOptions.map((option) => (
                                <Radio key={option.value} value={option.value} className="w-full">
                                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                                    <div className="flex-shrink-0">
                                      {option.icon}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-semibold text-lg text-gray-900">{option.title}</div>
                                      <div className="text-gray-600">{option.description}</div>
                                    </div>
                                  </div>
                                </Radio>
                              ))}
                            </Space>
                          </Radio.Group>
                        </motion.div>
                      )}

                      {/* Step 2: Personal Information */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Title level={4} className="mb-6">Personal Information</Title>
                          
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[{ required: true, message: 'Please enter your first name!' }]}
                              >
                                <Input
                                  prefix={<UserOutlined className="text-gray-400" />}
                                  placeholder="First name"
                                  className="h-12 rounded-xl"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                              >
                                <Input
                                  prefix={<UserOutlined className="text-gray-400" />}
                                  placeholder="Last name"
                                  className="h-12 rounded-xl"
                                />
                              </Form.Item>
                            </Col>
                          </Row>

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
                              className="h-12 rounded-xl"
                            />
                          </Form.Item>

                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                  { required: true, message: 'Please enter your password!' },
                                  { min: 8, message: 'Password must be at least 8 characters!' }
                                ]}
                              >
                                <Input.Password
                                  prefix={<LockOutlined className="text-gray-400" />}
                                  placeholder="Create a password"
                                  className="h-12 rounded-xl"
                                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={['password']}
                                rules={[
                                  { required: true, message: 'Please confirm your password!' },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                  }),
                                ]}
                              >
                                <Input.Password
                                  prefix={<LockOutlined className="text-gray-400" />}
                                  placeholder="Confirm password"
                                  className="h-12 rounded-xl"
                                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </motion.div>
                      )}

                      {/* Step 3: Contact Details */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Title level={4} className="mb-6">Contact Details</Title>
                          
                          <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                              { required: true, message: 'Please enter your phone number!' },
                              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number!' }
                            ]}
                          >
                            <Input
                              prefix={<PhoneOutlined className="text-gray-400" />}
                              placeholder="Enter your phone number"
                              className="h-12 rounded-xl"
                            />
                          </Form.Item>

                          <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please enter your address!' }]}
                          >
                            <Input.TextArea
                              prefix={<HomeOutlined className="text-gray-400" />}
                              placeholder="Enter your full address"
                              rows={3}
                              className="rounded-xl"
                            />
                          </Form.Item>

                          <Row gutter={16}>
                            <Col span={8}>
                              <Form.Item
                                name="city"
                                label="City"
                                rules={[{ required: true, message: 'Please enter your city!' }]}
                              >
                                <Input placeholder="City" className="h-12 rounded-xl" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                name="state"
                                label="State"
                                rules={[{ required: true, message: 'Please enter your state!' }]}
                              >
                                <Input placeholder="State" className="h-12 rounded-xl" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                name="pincode"
                                label="PIN Code"
                                rules={[
                                  { required: true, message: 'Please enter your PIN code!' },
                                  { pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit PIN code!' }
                                ]}
                              >
                                <Input placeholder="PIN Code" className="h-12 rounded-xl" />
                              </Form.Item>
                            </Col>
                          </Row>

                          {userType === 'farmer' && (
                            <Form.Item
                              name="farmName"
                              label="Farm Name"
                              rules={[{ required: true, message: 'Please enter your farm name!' }]}
                            >
                              <Input 
                                prefix={<EnvironmentOutlined className="text-gray-400" />}
                                placeholder="Enter your farm name" 
                                className="h-12 rounded-xl" 
                              />
                            </Form.Item>
                          )}
                        </motion.div>
                      )}

                      {/* Step 4: Review */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Title level={4} className="mb-6">Review Your Information</Title>
                          
                          <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                            <div className="flex justify-between">
                              <Text strong>Account Type:</Text>
                              <Text className="capitalize">{userType}</Text>
                            </div>
                            <div className="flex justify-between">
                              <Text strong>Name:</Text>
                              <Text>{form.getFieldValue('firstName')} {form.getFieldValue('lastName')}</Text>
                            </div>
                            <div className="flex justify-between">
                              <Text strong>Email:</Text>
                              <Text>{form.getFieldValue('email')}</Text>
                            </div>
                            <div className="flex justify-between">
                              <Text strong>Phone:</Text>
                              <Text>{form.getFieldValue('phone')}</Text>
                            </div>
                            <div className="flex justify-between">
                              <Text strong>Address:</Text>
                              <Text>{form.getFieldValue('address')}</Text>
                            </div>
                            {userType === 'farmer' && (
                              <div className="flex justify-between">
                                <Text strong>Farm Name:</Text>
                                <Text>{form.getFieldValue('farmName')}</Text>
                              </div>
                            )}
                          </div>

                          <Form.Item
                            name="agreeToTerms"
                            valuePropName="checked"
                            rules={[{ required: true, message: 'Please agree to the terms and conditions!' }]}
                          >
                            <Checkbox className="font-medium">
                              I agree to the{' '}
                              <Link href="/terms" className="text-green-600 hover:text-green-700">
                                Terms and Conditions
                              </Link>{' '}
                              and{' '}
                              <Link href="/privacy" className="text-green-600 hover:text-green-700">
                                Privacy Policy
                              </Link>
                            </Checkbox>
                          </Form.Item>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                      <Button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="h-12 px-8 rounded-xl"
                        icon={<ArrowLeftOutlined />}
                      >
                        Previous
                      </Button>

                      {currentStep < 3 ? (
                        <Button
                          type="primary"
                          onClick={nextStep}
                          className="h-12 px-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 rounded-xl font-bold"
                          icon={<ArrowRightOutlined />}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          className="h-12 px-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 rounded-xl font-bold"
                          icon={<CheckCircleOutlined />}
                        >
                          Create Account
                        </Button>
                      )}
                    </div>
                  </Form>

                  {/* Sign In Link */}
                  <div className="text-center mt-8">
                    <Text className="text-gray-600 text-lg">
                      Already have an account?{' '}
                      <Link 
                        href="/login" 
                        className="text-green-600 hover:text-green-700 font-bold"
                      >
                        Sign in here
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


export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
