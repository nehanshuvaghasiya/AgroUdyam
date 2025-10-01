'use client';

import { Typography } from 'antd';
import { 
  ShoppingCartOutlined, 
  TruckOutlined, 
  SafetyOutlined,
  HeartOutlined,
  RocketOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

const { Title, Paragraph } = Typography;

export const HeroSection = () => {
  const features = [
    {
      icon: <TruckOutlined />,
      title: 'Fast Delivery',
      description: 'Get fresh produce within 24 hours',
    },
    {
      icon: <SafetyOutlined />,
      title: 'Quality Assured',
      description: 'Direct from farm, premium quality',
    },
    {
      icon: <HeartOutlined />,
      title: 'Support Farmers',
      description: 'Empowering local agriculture',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6"
            >
              <RocketOutlined />
              <span className="text-sm font-semibold">Fresh From Farm to Your Table</span>
            </motion.div>

            <Title level={1} className="!text-5xl md:!text-6xl !font-bold !mb-6 !text-gray-900">
              Premium Fresh
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Organic Produce
              </span>
            </Title>
            
            <Paragraph className="!text-xl !text-gray-600 !mb-8 !leading-relaxed">
              Connect directly with local farmers and enjoy the freshest organic produce 
              delivered to your doorstep. Support sustainable agriculture while nourishing 
              your family with quality food.
            </Paragraph>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/products">
                <Button 
                  type="primary" 
                  size="large"
                  className="!h-14 !px-8 !text-lg !font-semibold !bg-gradient-to-r !from-green-600 !to-emerald-600 hover:!from-green-700 hover:!to-emerald-700 !border-0 !rounded-xl !shadow-lg hover:!shadow-xl transition-all"
                  icon={<ShoppingCartOutlined />}
                >
                  Shop Now
                </Button>
              </Link>
              
              <Link href="/about">
                <Button 
                  size="large"
                  className="!h-14 !px-8 !text-lg !font-semibold !bg-white !text-gray-700 hover:!bg-gray-50 !border-2 !border-gray-200 !rounded-xl !shadow-md hover:!shadow-lg transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircleOutlined className="text-green-600 text-lg" />
                <span>500+ Local Farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlined className="text-green-600 text-lg" />
                <span>10K+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlined className="text-green-600 text-lg" />
                <span>100% Organic</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-8 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-10 blur-2xl" />
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold text-lg mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: '500+', label: 'Farmers' },
                  { value: '1000+', label: 'Products' },
                  { value: '50K+', label: 'Orders' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="bg-white border-2 border-green-100 rounded-xl p-4 text-center hover:border-green-300 transition-all"
                  >
                    <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                    <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl opacity-80 rotate-12" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-80 -rotate-12" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
