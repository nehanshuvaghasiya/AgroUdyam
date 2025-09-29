'use client';

import { Typography, Row, Col, Statistic } from 'antd';
import { 
  TeamOutlined, 
  ShopOutlined, 
  ShoppingCartOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const StatsSection = () => {
  const stats = [
    {
      icon: <TeamOutlined className="text-4xl text-green-500" />,
      title: 'Partner Farmers',
      value: '500+',
      description: 'Active farmers across India',
      color: 'text-green-600',
    },
    {
      icon: <ShopOutlined className="text-4xl text-blue-500" />,
      title: 'Products Available',
      value: '1000+',
      description: 'Fresh produce items',
      color: 'text-blue-600',
    },
    {
      icon: <ShoppingCartOutlined className="text-4xl text-orange-500" />,
      title: 'Orders Delivered',
      value: '50K+',
      description: 'Successful deliveries',
      color: 'text-orange-600',
    },
    {
      icon: <TrophyOutlined className="text-4xl text-purple-500" />,
      title: 'Customer Satisfaction',
      value: '98%',
      description: 'Happy customers',
      color: 'text-purple-600',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title level={2} className="text-white mb-4">
            Our Impact in Numbers
          </Title>
          <Text className="text-green-100 text-lg">
            Building a sustainable future for agriculture
          </Text>
        </motion.div>

        {/* Stats Grid */}
        <Row gutter={[32, 32]}>
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>

                  {/* Statistic */}
                  <Statistic
                    title={<span className="text-white text-sm font-medium">{stat.title}</span>}
                    value={stat.value}
                    valueStyle={{ 
                      color: '#ffffff', 
                      fontSize: '2.5rem', 
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />

                  {/* Description */}
                  <Text className="text-green-100 text-sm mt-2 block">
                    {stat.description}
                  </Text>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 max-w-4xl mx-auto">
            <Title level={3} className="text-white mb-4">
              Join the KrishiConnect Community
            </Title>
            <Text className="text-green-100 text-lg leading-relaxed">
              Be part of a growing community that's transforming agriculture in India. 
              Whether you're a farmer looking to expand your reach or a customer seeking 
              fresh, quality produce, KrishiConnect is your gateway to a better food system.
            </Text>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
