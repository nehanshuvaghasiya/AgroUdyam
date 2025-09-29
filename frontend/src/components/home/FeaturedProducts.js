'use client';

import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Rate, Tag, Space, Spin } from 'antd';
import { 
  ShoppingCartOutlined, 
  EyeOutlined, 
  HeartOutlined,
  StarOutlined,
  FireOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { productService } from '@/services/product.service';
import { LoadingSpinner, ProductListSkeleton } from '@/components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    // In development, try API first, fallback to mock data
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    
    // Check if we're in development and backend might not be available
    const isDevelopment = process.env.NODE_ENV === 'development';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (isDevelopment && (!apiUrl || apiUrl.includes('localhost:8081'))) {
      console.log('Development mode - using mock data');
      setProducts(getMockProducts());
      setLoading(false);
      return;
    }
    
    try {
      const response = await productService.getFeaturedProducts(8);
      
      if (response && response.success) {
        setProducts(response.data.products || []);
      } else {
        // Any error response - use mock data
        console.log('Using mock data - API not available');
        setProducts(getMockProducts());
      }
    } catch (err) {
      // Network error or any other error - use mock data
      console.log('Using mock data - caught error:', err.message);
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  const getMockProducts = () => [
    {
      _id: '1',
      name: 'Fresh Organic Tomatoes',
      price: 120,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'John Farmer' },
      quantity: 50,
      unit: 'kg',
      category: 'vegetables',
      organic: true,
      averageRating: 4.5,
      totalReviews: 25,
      description: 'Fresh organic tomatoes from local farms'
    },
    {
      _id: '2',
      name: 'Sweet Mangoes',
      price: 200,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'Sarah Grower' },
      quantity: 30,
      unit: 'kg',
      category: 'fruits',
      organic: true,
      averageRating: 4.8,
      totalReviews: 18,
      description: 'Sweet and juicy mangoes'
    },
    {
      _id: '3',
      name: 'Fresh Carrots',
      price: 80,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'Mike Gardner' },
      quantity: 75,
      unit: 'kg',
      category: 'vegetables',
      organic: true,
      averageRating: 4.3,
      totalReviews: 32,
      description: 'Crisp and fresh organic carrots'
    },
    {
      _id: '4',
      name: 'Basmati Rice',
      price: 150,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'Raj Kumar' },
      quantity: 100,
      unit: 'kg',
      category: 'grains',
      organic: true,
      averageRating: 4.7,
      totalReviews: 45,
      description: 'Premium quality basmati rice'
    },
    {
      _id: '5',
      name: 'Fresh Spinach',
      price: 60,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'Priya Singh' },
      quantity: 40,
      unit: 'kg',
      category: 'vegetables',
      organic: true,
      averageRating: 4.4,
      totalReviews: 28,
      description: 'Nutritious fresh spinach leaves'
    },
    {
      _id: '6',
      name: 'Red Bell Peppers',
      price: 180,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'David Wilson' },
      quantity: 25,
      unit: 'kg',
      category: 'vegetables',
      organic: true,
      averageRating: 4.6,
      totalReviews: 19,
      description: 'Sweet and colorful bell peppers'
    },
    {
      _id: '7',
      name: 'Fresh Bananas',
      price: 90,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'Maria Garcia' },
      quantity: 60,
      unit: 'kg',
      category: 'fruits',
      organic: true,
      averageRating: 4.2,
      totalReviews: 35,
      description: 'Ripe and sweet bananas'
    },
    {
      _id: '8',
      name: 'Green Peas',
      price: 110,
      images: [{ url: '/images/placeholder-product.jpg' }],
      farmer: { name: 'Tom Anderson' },
      quantity: 35,
      unit: 'kg',
      category: 'vegetables',
      organic: true,
      averageRating: 4.5,
      totalReviews: 22,
      description: 'Fresh green peas'
    }
  ];

  const handleAddToCart = (product) => {
    if (product.quantity <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    
    addToCart(product, 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getCategoryColor = (category) => {
    const colors = {
      vegetables: 'green',
      fruits: 'orange',
      grains: 'brown',
      spices: 'red',
      herbs: 'cyan',
      dairy: 'blue',
      poultry: 'purple',
      other: 'default',
    };
    return colors[category] || 'default';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Title level={2} className="text-gray-900 mb-4">
              Featured Products
            </Title>
            <Text className="text-gray-600 text-lg">
              Fresh produce from our partner farmers
            </Text>
          </div>
          <ProductListSkeleton count={8} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title level={2} className="text-gray-900 mb-4">
            Featured Products
          </Title>
          <Text className="text-red-500">{error}</Text>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <FireOutlined className="text-2xl text-orange-500 mr-2" />
            <Title level={2} className="text-gray-900 mb-0">
              Featured Products
            </Title>
          </div>
          <Text className="text-gray-600 text-lg">
            Fresh produce from our partner farmers
          </Text>
        </motion.div>

        {/* Products Grid */}
        <Row gutter={[24, 24]}>
          {products.map((product, index) => (
            <Col xs={24} sm={12} lg={6} key={product._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="product-card h-full"
                  cover={
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.primaryImage?.url || product.images?.[0]?.url || '/images/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <Tag color={getCategoryColor(product.category)}>
                          {product.category}
                        </Tag>
                      </div>
                      {product.organic && (
                        <div className="absolute top-2 right-2">
                          <Tag color="green">Organic</Tag>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                        <Space className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <Link href={`/products/${product._id}`}>
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<EyeOutlined />}
                              className="bg-white text-gray-900 hover:bg-gray-100"
                            />
                          </Link>
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<HeartOutlined />}
                            className="bg-white text-gray-900 hover:bg-gray-100"
                          />
                        </Space>
                      </div>
                    </div>
                  }
                  actions={[
                    <Button
                      key="cart"
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.quantity <= 0 || isInCart(product._id)}
                      className="w-full"
                    >
                      {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
                    </Button>,
                  ]}
                >
                  <div className="space-y-2">
                    <Link href={`/products/${product._id}`}>
                      <Title level={5} className="text-gray-900 hover:text-green-600 transition-colors duration-200 mb-2">
                        {product.name}
                      </Title>
                    </Link>
                    
                    <Text className="text-gray-600 text-sm line-clamp-2">
                      {product.description}
                    </Text>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Rate
                          disabled
                          value={product.averageRating || 0}
                          className="text-sm"
                        />
                        <Text className="text-gray-500 text-xs">
                          ({product.totalReviews || 0})
                        </Text>
                      </div>
                      <Text className="text-gray-500 text-xs">
                        {product.quantity} {product.unit} left
                      </Text>
                    </div>

                    <div className="flex items-center justify-between">
                      <Text className="text-green-600 font-bold text-lg">
                        {formatPrice(product.price)}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        per {product.unit}
                      </Text>
                    </div>

                    {product.farmer && (
                      <div className="pt-2 border-t border-gray-100">
                        <Text className="text-gray-500 text-xs">
                          By {product.farmer.name}
                        </Text>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* View All Button */}
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
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
