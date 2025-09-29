'use client';

import { Typography, Row, Col, Card, Rate, Avatar } from 'antd';
import { MessageOutlined, StarFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Customer',
      location: 'Mumbai',
      rating: 5,
      content: 'KrishiConnect has completely changed how I buy vegetables. The quality is amazing and delivery is super fast. I love supporting local farmers!',
      avatar: '/images/testimonials/sarah.jpg',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Farmer',
      location: 'Punjab',
      rating: 5,
      content: 'This platform has helped me reach customers directly. I can now sell my produce at fair prices without middlemen taking huge cuts.',
      avatar: '/images/testimonials/rajesh.jpg',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Customer',
      location: 'Delhi',
      rating: 5,
      content: 'The organic vegetables I get from KrishiConnect are the freshest I\'ve ever had. My family loves the taste and I love the convenience.',
      avatar: '/images/testimonials/priya.jpg',
    },
    {
      id: 4,
      name: 'Amit Singh',
      role: 'Farmer',
      location: 'Haryana',
      rating: 5,
      content: 'KrishiConnect has given me a platform to showcase my products. The support team is excellent and payments are always on time.',
      avatar: '/images/testimonials/amit.jpg',
    },
    {
      id: 5,
      name: 'Meera Patel',
      role: 'Customer',
      location: 'Gujarat',
      rating: 5,
      content: 'I\'ve been using KrishiConnect for 6 months now. The variety of products and the quality is consistently excellent. Highly recommended!',
      avatar: '/images/testimonials/meera.jpg',
    },
    {
      id: 6,
      name: 'Vikram Reddy',
      role: 'Farmer',
      location: 'Andhra Pradesh',
      rating: 5,
      content: 'This platform has helped me expand my business beyond my local area. I can now sell to customers across the country.',
      avatar: '/images/testimonials/vikram.jpg',
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
          className="text-center mb-16"
        >
          <Title level={2} className="text-gray-900 mb-4">
            What Our Customers Say
          </Title>
          <Text className="text-gray-600 text-lg">
            Real stories from real people who love KrishiConnect
          </Text>
        </motion.div>

        {/* Testimonials Grid */}
        <Row gutter={[24, 24]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} sm={12} lg={8} key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="h-full hover:shadow-lg transition-all duration-300"
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="space-y-4">
                    {/* Quote Icon */}
                    <div className="flex justify-center">
                      <MessageOutlined className="text-3xl text-green-500" />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center">
                      <Rate
                        disabled
                        value={testimonial.rating}
                        character={<StarFilled />}
                        className="text-yellow-400"
                      />
                    </div>

                    {/* Content */}
                    <Text className="text-gray-700 text-center block leading-relaxed">
                      "{testimonial.content}"
                    </Text>

                    {/* Author */}
                    <div className="flex items-center justify-center space-x-3 pt-4 border-t border-gray-100">
                      <Avatar
                        size={48}
                        src={testimonial.avatar}
                        className="border-2 border-green-500"
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <div className="text-center">
                        <Text className="font-semibold text-gray-900 block">
                          {testimonial.name}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          {testimonial.role} • {testimonial.location}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Row gutter={[32, 32]} className="text-center">
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <Title level={2} className="text-green-600 mb-0">4.9</Title>
                <Text className="text-gray-600">Average Rating</Text>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <Title level={2} className="text-green-600 mb-0">10K+</Title>
                <Text className="text-gray-600">Happy Customers</Text>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <Title level={2} className="text-green-600 mb-0">500+</Title>
                <Text className="text-gray-600">Partner Farmers</Text>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <Title level={2} className="text-green-600 mb-0">50K+</Title>
                <Text className="text-gray-600">Orders Delivered</Text>
              </div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};
