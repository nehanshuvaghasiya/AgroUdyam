'use client';

import { useState, useEffect } from 'react';
import { Button, Typography, Row, Col, Space, Statistic } from 'antd';
import { 
  ShoppingCartOutlined, 
  TruckOutlined, 
  SafetyOutlined,
  HeartOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    '/images/hero-farmers.jpg',
    '/images/hero-vegetables.jpg',
    '/images/hero-fresh-produce.jpg',
  ];

  const stats = [
    { title: 'Farmers Connected', value: '500+', suffix: '' },
    { title: 'Products Available', value: '1000+', suffix: '' },
    { title: 'Happy Customers', value: '10K+', suffix: '' },
    { title: 'Orders Delivered', value: '50K+', suffix: '' },
  ];

  const features = [
    {
      icon: <TruckOutlined className="text-2xl text-green-500" />,
      title: 'Fast Delivery',
      description: 'Fresh produce delivered within 24 hours',
    },
    {
      icon: <SafetyOutlined className="text-2xl text-green-500" />,
      title: 'Quality Assured',
      description: 'Direct from farm, quality guaranteed',
    },
    {
      icon: <HeartOutlined className="text-2xl text-green-500" />,
      title: 'Support Farmers',
      description: 'Help local farmers grow their business',
    },
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <Title level={1} className="text-white text-4xl md:text-6xl font-bold mb-6">
                Fresh Produce
                <br />
                <span className="text-green-400">From Farm to Table</span>
              </Title>
              
              <Paragraph className="text-xl text-gray-200 mb-8 max-w-2xl">
                Connect directly with local farmers and get the freshest, 
                organic produce delivered to your doorstep. Support sustainable 
                agriculture while enjoying premium quality food.
              </Paragraph>

              <Space size="large" wrap>
                <Link href="/products">
                  <Button 
                    type="primary" 
                    size="large"
                    className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 h-12 px-8 text-lg font-semibold"
                    icon={<ShoppingCartOutlined />}
                  >
                    Shop Now
                  </Button>
                </Link>
                
                <Button 
                  type="default" 
                  size="large"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 h-12 px-8 text-lg font-semibold"
                  icon={<PlayCircleOutlined />}
                >
                  Watch Video
                </Button>
              </Space>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20"
            >
              <Title level={3} className="text-white mb-6 text-center">
                Why Choose KrishiConnect?
              </Title>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <Row gutter={[32, 32]} className="text-center">
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20"
                >
                  <Statistic
                    title={<span className="text-white text-sm">{stat.title}</span>}
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ color: '#52c41a', fontSize: '2rem', fontWeight: 'bold' }}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRightOutlined className="text-xl transform rotate-90" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
