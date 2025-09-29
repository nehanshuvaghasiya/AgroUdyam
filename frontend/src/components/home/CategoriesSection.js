'use client';

import { Typography, Row, Col, Card, Button } from 'antd';
import { 
  AppleOutlined, 
  CarOutlined, 
  ExperimentOutlined, 
  CoffeeOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  MoreOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const CategoriesSection = () => {
  const categories = [
    {
      id: 'vegetables',
      name: 'Vegetables',
      icon: <CarOutlined className="text-4xl" />,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Fresh, organic vegetables',
      count: '150+ items',
    },
    {
      id: 'fruits',
      name: 'Fruits',
      icon: <AppleOutlined className="text-4xl" />,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: 'Sweet, juicy fruits',
      count: '80+ items',
    },
    {
      id: 'grains',
      name: 'Grains',
      icon: <ExperimentOutlined className="text-4xl" />,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      description: 'Nutritious grains & cereals',
      count: '60+ items',
    },
    {
      id: 'spices',
      name: 'Spices',
      icon: <CoffeeOutlined className="text-4xl" />,
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      description: 'Aromatic spices & herbs',
      count: '40+ items',
    },
    {
      id: 'herbs',
      name: 'Herbs',
      icon: <EnvironmentOutlined className="text-4xl" />,
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      description: 'Fresh medicinal herbs',
      count: '30+ items',
    },
    {
      id: 'dairy',
      name: 'Dairy',
      icon: <ThunderboltOutlined className="text-4xl" />,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Fresh dairy products',
      count: '25+ items',
    },
    {
      id: 'poultry',
      name: 'Poultry',
      icon: <CrownOutlined className="text-4xl" />,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Farm-fresh poultry',
      count: '20+ items',
    },
    {
      id: 'other',
      name: 'Others',
      icon: <MoreOutlined className="text-4xl" />,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      description: 'More farm products',
      count: '50+ items',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Title level={2} className="text-gray-900 mb-4">
            Shop by Category
          </Title>
          <Text className="text-gray-600 text-lg">
            Find exactly what you're looking for
          </Text>
        </motion.div>

        {/* Categories Grid */}
        <Row gutter={[24, 24]}>
          {categories.map((category, index) => (
            <Col xs={12} sm={8} lg={6} key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/products?category=${category.id}`}>
                  <Card
                    className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                    styles={{ body: { padding: '24px' } }}
                  >
                    <div className="text-center space-y-4">
                      {/* Icon */}
                      <div className={`w-16 h-16 mx-auto rounded-full ${category.bgColor} flex items-center justify-center ${category.textColor}`}>
                        {category.icon}
                      </div>

                      {/* Content */}
                      <div>
                        <Title level={4} className="text-gray-900 mb-2">
                          {category.name}
                        </Title>
                        <Text className="text-gray-600 text-sm mb-2 block">
                          {category.description}
                        </Text>
                        <Text className={`text-xs font-semibold ${category.textColor}`}>
                          {category.count}
                        </Text>
                      </div>

                      {/* Arrow */}
                      <div className="flex justify-center">
                        <ArrowRightOutlined className={`text-lg ${category.textColor} opacity-60`} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button
              type="primary"
              size="large"
              className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 px-8"
            >
              Browse All Categories
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
