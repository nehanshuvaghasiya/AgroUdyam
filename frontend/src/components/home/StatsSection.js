'use client';

import { Typography } from 'antd';
import { 
  UserOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TrophyOutlined,
  RiseOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

export const StatsSection = () => {
  const [counters, setCounters] = useState({
    farmers: 0,
    customers: 0,
    orders: 0,
    products: 0,
  });

  const finalStats = {
    farmers: 500,
    customers: 10000,
    orders: 50000,
    products: 1000,
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        farmers: Math.floor(finalStats.farmers * progress),
        customers: Math.floor(finalStats.customers * progress),
        orders: Math.floor(finalStats.orders * progress),
        products: Math.floor(finalStats.products * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(finalStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: <ShopOutlined />,
      value: `${counters.farmers}+`,
      label: 'Local Farmers',
      description: 'Trusted farming partners',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: <UserOutlined />,
      value: `${(counters.customers / 1000).toFixed(0)}K+`,
      label: 'Happy Customers',
      description: 'Satisfied buyers nationwide',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <ShoppingOutlined />,
      value: `${(counters.orders / 1000).toFixed(0)}K+`,
      label: 'Orders Delivered',
      description: 'Successfully completed orders',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <TrophyOutlined />,
      value: `${counters.products}+`,
      label: 'Products Available',
      description: 'Fresh produce variety',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
  ];

  const achievements = [
    {
      icon: <RiseOutlined />,
      title: '98% Customer Satisfaction',
      description: 'Based on 10,000+ reviews',
    },
    {
      icon: <GlobalOutlined />,
      title: 'Available in 50+ Cities',
      description: 'Expanding across India',
    },
    {
      icon: <TrophyOutlined />,
      title: 'Award-Winning Platform',
      description: 'Best Agri-Tech Startup 2024',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title level={2} className="!text-4xl !font-bold !text-gray-900 !mb-4">
            Our Impact in Numbers
          </Title>
          <Text className="!text-lg !text-gray-600">
            Growing together with our farming community
          </Text>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${stat.bgColor} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-gray-200 group`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 border-2 border-gray-100 hover:border-green-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
