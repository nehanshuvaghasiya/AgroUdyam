'use client';

import { Typography, Row, Col, Card, Space } from 'antd';
import { 
  TruckOutlined, 
  SafetyOutlined, 
  HeartOutlined,
  TeamOutlined,
  DollarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <TruckOutlined className="text-4xl text-green-500" />,
      title: 'Fast Delivery',
      description: 'Get your fresh produce delivered within 24 hours directly from the farm to your doorstep.',
      highlight: '24h Delivery',
    },
    {
      icon: <SafetyOutlined className="text-4xl text-blue-500" />,
      title: 'Quality Assured',
      description: 'Every product is carefully selected and quality-checked to ensure you get the best.',
      highlight: '100% Fresh',
    },
    {
      icon: <HeartOutlined className="text-4xl text-red-500" />,
      title: 'Support Farmers',
      description: 'Help local farmers grow their business by buying directly from them.',
      highlight: 'Direct Trade',
    },
    {
      icon: <TeamOutlined className="text-4xl text-purple-500" />,
      title: 'Community Driven',
      description: 'Join a community that values sustainable agriculture and fresh, healthy food.',
      highlight: 'Community',
    },
    {
      icon: <DollarOutlined className="text-4xl text-orange-500" />,
      title: 'Fair Prices',
      description: 'Get competitive prices without middlemen, ensuring fair compensation for farmers.',
      highlight: 'Fair Trade',
    },
    {
      icon: <ClockCircleOutlined className="text-4xl text-cyan-500" />,
      title: 'Always Available',
      description: 'Shop anytime, anywhere with our 24/7 online platform and reliable service.',
      highlight: '24/7 Service',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title level={2} className="text-gray-900 mb-4">
            Why Choose KrishiConnect?
          </Title>
          <Text className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to providing the best experience for both farmers and customers, 
            creating a sustainable ecosystem for fresh produce.
          </Text>
        </motion.div>

        {/* Features Grid */}
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="h-full text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                  styles={{ body: { padding: '32px 24px' } }}
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex justify-center">
                      {feature.icon}
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-block">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {feature.highlight}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <Title level={4} className="text-gray-900 mb-3">
                        {feature.title}
                      </Title>
                      <Text className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </Text>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0">
            <div className="text-white">
              <Title level={3} className="text-white mb-4">
                Ready to Experience Fresh Produce?
              </Title>
              <Text className="text-green-100 text-lg mb-6 block">
                Join thousands of satisfied customers who trust KrishiConnect for their daily fresh produce needs.
              </Text>
              <Space size="large">
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    Start Shopping
                  </button>
                </motion.a>
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
                    Join as Farmer
                  </button>
                </motion.a>
              </Space>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
