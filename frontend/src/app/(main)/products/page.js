'use client';

import { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Input,
  Select,
  Slider,
  Checkbox,
  Rate,
  Tag,
  Space,
  Pagination,
  Spin,
  Empty
} from 'antd';
import { 
  SearchOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  EyeOutlined,
  StarOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import toast from 'react-hot-toast';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    organic: false,
    sortBy: 'newest'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const { addToCart, isInCart } = useCart();

  // Mock data for demonstration
  const mockProducts = [
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

  const categories = [
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'spices', label: 'Spices' },
    { value: 'herbs', label: 'Herbs' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'poultry', label: 'Poultry' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

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
      grains: 'yellow',
      spices: 'red',
      herbs: 'cyan',
      dairy: 'blue',
      poultry: 'purple',
    };
    return colors[category] || 'default';
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         product.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesRating = product.averageRating >= filters.rating;
    const matchesOrganic = !filters.organic || product.organic;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesOrganic;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <Content className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <Title level={2} className="text-gray-900 mb-4">
              Fresh Produce Marketplace
            </Title>
            <Text className="text-gray-600 text-lg">
              Discover fresh, organic products from local farmers
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            {/* Filters Sidebar */}
            <Col xs={24} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card title="Filters" className="sticky top-24">
                  <Space direction="vertical" className="w-full" size="large">
                    {/* Search */}
                    <div>
                      <Text strong className="block mb-2">Search</Text>
                      <Search
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                        prefix={<SearchOutlined />}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <Text strong className="block mb-2">Category</Text>
                      <Select
                        placeholder="All Categories"
                        value={filters.category}
                        onChange={(value) => setFilters({...filters, category: value})}
                        className="w-full"
                        allowClear
                      >
                        {categories.map(category => (
                          <Option key={category.value} value={category.value}>
                            {category.label}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <Text strong className="block mb-2">Price Range</Text>
                      <Slider
                        range
                        min={0}
                        max={1000}
                        value={filters.priceRange}
                        onChange={(value) => setFilters({...filters, priceRange: value})}
                        marks={{
                          0: '₹0',
                          500: '₹500',
                          1000: '₹1000'
                        }}
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <Text strong className="block mb-2">Minimum Rating</Text>
                      <Rate
                        value={filters.rating}
                        onChange={(value) => setFilters({...filters, rating: value})}
                        allowClear
                      />
                    </div>

                    {/* Organic */}
                    <div>
                      <Checkbox
                        checked={filters.organic}
                        onChange={(e) => setFilters({...filters, organic: e.target.checked})}
                      >
                        Organic Only
                      </Checkbox>
                    </div>

                    {/* Sort By */}
                    <div>
                      <Text strong className="block mb-2">Sort By</Text>
                      <Select
                        value={filters.sortBy}
                        onChange={(value) => setFilters({...filters, sortBy: value})}
                        className="w-full"
                      >
                        <Option value="newest">Newest First</Option>
                        <Option value="price-low">Price: Low to High</Option>
                        <Option value="price-high">Price: High to Low</Option>
                        <Option value="rating">Highest Rated</Option>
                        <Option value="popular">Most Popular</Option>
                      </Select>
                    </div>
                  </Space>
                </Card>
              </motion.div>
            </Col>

            {/* Products Grid */}
            <Col xs={24} lg={18}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <Text className="text-gray-600">
                    Showing {currentProducts.length} of {filteredProducts.length} products
                  </Text>
                  <Button icon={<FilterOutlined />}>
                    More Filters
                  </Button>
                </div>

                {/* Products Grid */}
                {loading ? (
                  <div className="text-center py-12">
                    <Spin size="large" />
                    <Text className="block mt-4 text-gray-600">Loading products...</Text>
                  </div>
                ) : currentProducts.length === 0 ? (
                  <Empty
                    description="No products found"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ) : (
                  <Row gutter={[24, 24]}>
                    {currentProducts.map((product, index) => (
                      <Col xs={24} sm={12} lg={8} key={product._id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card
                            className="h-full hover:shadow-lg transition-all duration-300"
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
                )}

                {/* Pagination */}
                {filteredProducts.length > pageSize && (
                  <div className="text-center mt-8">
                    <Pagination
                      current={currentPage}
                      total={filteredProducts.length}
                      pageSize={pageSize}
                      onChange={(page, size) => {
                        setCurrentPage(page);
                        setPageSize(size);
                      }}
                      showSizeChanger
                      showQuickJumper
                      showTotal={(total, range) => 
                        `${range[0]}-${range[1]} of ${total} items`
                      }
                    />
                  </div>
                )}
              </motion.div>
            </Col>
          </Row>
        </div>
      </Content>

      <AppFooter />
    </div>
  );
}
