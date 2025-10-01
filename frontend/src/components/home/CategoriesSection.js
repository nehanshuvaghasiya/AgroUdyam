'use client';

import { Typography } from 'antd';
import { 
  AppleOutlined,
  ShopOutlined,
  CoffeeOutlined,
  GoldOutlined,
  SketchOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const CategoriesSection = () => {
  const categories = [
    {
      icon: <AppleOutlined />,
      name: 'Fruits',
      count: '120+ Products',
      color: 'from-orange-400 to-red-400',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      icon: <ShopOutlined />,
      name: 'Vegetables',
      count: '200+ Products',
      color: 'from-green-400 to-emerald-400',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: <CoffeeOutlined />,
      name: 'Grains',
      count: '80+ Products',
      color: 'from-amber-400 to-yellow-400',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      icon: <GoldOutlined />,
      name: 'Spices',
      count: '50+ Products',
      color: 'from-red-400 to-pink-400',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      icon: <SketchOutlined />,
      name: 'Herbs',
      count: '40+ Products',
      color: 'from-teal-400 to-cyan-400',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
    },
    {
      icon: <ThunderboltOutlined />,
      name: 'Dairy',
      count: '60+ Products',
      color: 'from-blue-400 to-indigo-400',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title level={2} className="!text-4xl !font-bold !text-gray-900 !mb-4">
            Shop by Categories
          </Title>
          <Text className="!text-lg !text-gray-600">
            Browse through our wide range of fresh, organic produce
          </Text>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/products?category=${category.name.toLowerCase()}`}>
                <div className={`${category.bgColor} rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group border-2 border-transparent hover:border-gray-200`}>
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {category.icon}
                  </div>
                  <h3 className={`${category.textColor} font-bold text-lg mb-2`}>
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {category.count}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
