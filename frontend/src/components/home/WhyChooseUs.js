'use client';

import { Typography } from 'antd';
import { 
  TruckOutlined,
  SafetyOutlined,
  HeartOutlined,
  DollarOutlined,
  CustomerServiceOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <TruckOutlined />,
      title: 'Fast & Free Delivery',
      description: 'Get your orders delivered within 24 hours with no delivery charges on orders above ₹500',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <SafetyOutlined />,
      title: '100% Quality Guarantee',
      description: 'All products are quality checked and sourced directly from verified organic farms',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <HeartOutlined />,
      title: 'Support Local Farmers',
      description: 'Every purchase directly supports local farmers and sustainable agriculture practices',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: <DollarOutlined />,
      title: 'Best Prices',
      description: 'No middlemen means better prices for you and fair prices for our farmers',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <CustomerServiceOutlined />,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is always here to help you with any questions',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Fresh from Farm',
      description: 'Products harvested fresh and delivered to you within hours of picking',
      color: 'from-teal-500 to-green-500',
    },
  ];

  const benefits = [
    'Organic & Pesticide-free',
    'Farm-fresh Quality',
    'Fair Trade Pricing',
    'Eco-friendly Packaging',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <StarOutlined />
            <span className="text-sm font-semibold">Why Choose Us</span>
          </div>
          <Title level={2} className="!text-4xl !font-bold !text-gray-900 !mb-4">
            The AgroUdyam Advantage
          </Title>
          <Text className="!text-lg !text-gray-600 max-w-2xl mx-auto block">
            We connect you directly with local farmers, ensuring the freshest produce 
            while supporting sustainable agriculture
          </Text>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Title level={3} className="!text-3xl !font-bold !text-gray-900 !mb-6">
                Every Product is Carefully Selected
              </Title>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircleOutlined className="text-white" />
                    </div>
                    <span className="text-lg text-gray-700 font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 text-white text-center">
                <div className="text-6xl font-bold mb-2">10K+</div>
                <div className="text-xl mb-6">Happy Customers</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm">Farmers</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm">Orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
