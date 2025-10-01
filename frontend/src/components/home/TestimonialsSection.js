'use client';

import { Typography } from 'antd';
import { 
  StarFilled,
  UserOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Home Chef',
      location: 'Mumbai',
      image: '/images/testimonial-1.jpg',
      rating: 5,
      comment: 'The quality of vegetables I receive is outstanding! Fresh, organic, and delivered right to my doorstep. Supporting local farmers has never been easier.',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Restaurant Owner',
      location: 'Delhi',
      image: '/images/testimonial-2.jpg',
      rating: 5,
      comment: 'As a restaurant owner, sourcing fresh ingredients is crucial. AgroUdyam has become our trusted partner for premium quality produce at great prices.',
    },
    {
      name: 'Sneha Patel',
      role: 'Health Enthusiast',
      location: 'Bangalore',
      image: '/images/testimonial-3.jpg',
      rating: 5,
      comment: 'I love that I can directly support farmers while getting the freshest organic produce. The platform is easy to use and delivery is always on time!',
    },
    {
      name: 'Amit Verma',
      role: 'Fitness Trainer',
      location: 'Pune',
      image: '/images/testimonial-4.jpg',
      rating: 5,
      comment: 'For my clients who focus on nutrition, I always recommend AgroUdyam. The produce quality is exceptional and you can taste the difference!',
    },
    {
      name: 'Meera Reddy',
      role: 'Working Professional',
      location: 'Hyderabad',
      image: '/images/testimonial-5.jpg',
      rating: 5,
      comment: 'With my busy schedule, AgroUdyam makes it so convenient to get fresh groceries. The quality is amazing and customer service is excellent!',
    },
    {
      name: 'Vikram Singh',
      role: 'Food Blogger',
      location: 'Chennai',
      image: '/images/testimonial-6.jpg',
      rating: 5,
      comment: 'As someone who values quality ingredients, AgroUdyam never disappoints. Farm-fresh produce that makes every recipe special!',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full opacity-10 blur-3xl" />

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
            <StarFilled />
            <span className="text-sm font-semibold">Customer Reviews</span>
          </div>
          <Title level={2} className="!text-4xl !font-bold !text-gray-900 !mb-4">
            What Our Customers Say
          </Title>
          <Text className="!text-lg !text-gray-600">
            Join thousands of happy customers enjoying farm-fresh produce
          </Text>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-green-100 text-5xl font-serif">
                "
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarFilled key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>

              {/* Comment */}
              <Text className="!text-gray-700 !leading-relaxed !block !mb-6">
                "{testimonial.comment}"
              </Text>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl px-12 py-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">4.8/5.0</div>
              <div className="flex gap-1 justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <StarFilled key={i} className="text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">10,000+</div>
              <div className="text-sm text-gray-500">Happy Customers</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">50,000+</div>
              <div className="text-sm text-gray-500">Orders Delivered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
