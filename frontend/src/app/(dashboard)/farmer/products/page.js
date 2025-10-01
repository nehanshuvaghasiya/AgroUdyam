'use client';

import { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Button, 
  Table, 
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tag,
  Upload,
  Image,
  Popconfirm
} from 'antd';
import { 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  AppstoreOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { productService } from '@/services/product.service';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function FarmerProducts() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, searchText, categoryFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pageSize,
      };
      
      if (searchText) params.search = searchText;
      if (categoryFilter) params.category = categoryFilter;

      const result = await productService.getFarmerProducts(params);
      if (result.success) {
        setProducts(result.data.products || []);
        setTotal(result.data.pagination?.total || 0);
      } else {
        message.error(result.message || 'Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      unit: product.unit,
      category: product.category,
      tags: product.tags?.join(', ')
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await productService.deleteProduct(productId);
      if (result.success) {
        message.success('Product deleted successfully!');
        fetchProducts();
      } else {
        message.error(result.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (key === 'images' && values[key]?.fileList) {
          values[key].fileList.forEach(file => {
            if (file.originFileObj) {
              formData.append('images', file.originFileObj);
            }
          });
        } else if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      let result;
      if (editingProduct) {
        result = await productService.updateProduct(editingProduct._id, formData);
      } else {
        result = await productService.createProduct(formData);
      }

      if (result.success) {
        message.success(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
        setShowModal(false);
        form.resetFields();
        fetchProducts();
      } else {
        message.error(result.message || `Failed to ${editingProduct ? 'update' : 'create'} product`);
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      message.error(`Failed to ${editingProduct ? 'update' : 'create'} product`);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      width: 80,
      render: (images) => (
        <Image
          width={60}
          height={60}
          src={images?.[0]?.url || '/placeholder-product.jpg'}
          alt="Product"
          className="rounded-lg object-cover"
          fallback="/placeholder-product.jpg"
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <Text strong className="text-gray-900">{name}</Text>
          <div className="text-sm text-gray-500">{record.category}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => (
        <Text strong className="text-green-600">₹{price}/{record.unit}</Text>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <Tag color={quantity > 10 ? 'green' : quantity > 0 ? 'orange' : 'red'}>
          {quantity} {record.unit}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">★</span>
          <Text>{rating || '0.0'}</Text>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/products/${record._id}`)}
            title="View"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
            title="Edit"
          />
          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDeleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Delete"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute requiredRoles={['farm_owner', 'farm_manager', 'farm_worker']}>
      <Layout className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Title level={2} className="mb-2">Products Management</Title>
              <Text className="text-gray-600">Manage your product inventory</Text>
            </div>
            <Space>
              <Link href="/farmer">
                <Button>Back to Dashboard</Button>
              </Link>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateProduct}
                className="bg-green-500 hover:bg-green-600"
                size="large"
              >
                Add New Product
              </Button>
            </Space>
          </div>

          {/* Filters */}
          <Card className="mb-6 shadow-lg border-0">
            <Space size="middle" className="w-full" wrap>
              <Input
                placeholder="Search products..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
                allowClear
              />
              <Select
                placeholder="Filter by category"
                value={categoryFilter || undefined}
                onChange={setCategoryFilter}
                style={{ width: 200 }}
                allowClear
              >
                <Select.Option value="">All Categories</Select.Option>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="grains">Grains</Select.Option>
                <Select.Option value="herbs">Herbs</Select.Option>
                <Select.Option value="dairy">Dairy</Select.Option>
              </Select>
              <Button icon={<FilterOutlined />}>More Filters</Button>
            </Space>
          </Card>

          {/* Products Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-lg border-0">
              <Table
                columns={columns}
                dataSource={products}
                rowKey="_id"
                loading={loading}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  total: total,
                  onChange: (newPage, newPageSize) => {
                    setPage(newPage);
                    setPageSize(newPageSize);
                  },
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} products`,
                }}
              />
            </Card>
          </motion.div>

          {/* Create/Edit Modal */}
          <Modal
            title={
              <div className="flex items-center space-x-2">
                <AppstoreOutlined className="text-green-500" />
                <span>{editingProduct ? 'Edit Product' : 'Add New Product'}</span>
              </div>
            }
            open={showModal}
            onCancel={() => {
              setShowModal(false);
              form.resetFields();
              setEditingProduct(null);
            }}
            footer={null}
            width={800}
            className="modern-modal"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="mt-4"
            >
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Please enter product name' }]}
              >
                <Input placeholder="Enter product name" size="large" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: 'Please select category' }]}
                >
                  <Select placeholder="Select category" size="large">
                    <Select.Option value="vegetables">Vegetables</Select.Option>
                    <Select.Option value="fruits">Fruits</Select.Option>
                    <Select.Option value="grains">Grains</Select.Option>
                    <Select.Option value="herbs">Herbs</Select.Option>
                    <Select.Option value="dairy">Dairy</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Unit"
                  name="unit"
                  rules={[{ required: true, message: 'Please select unit' }]}
                >
                  <Select placeholder="Select unit" size="large">
                    <Select.Option value="kg">Kilogram (kg)</Select.Option>
                    <Select.Option value="g">Gram (g)</Select.Option>
                    <Select.Option value="l">Liter (l)</Select.Option>
                    <Select.Option value="piece">Piece</Select.Option>
                    <Select.Option value="bunch">Bunch</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Price (₹)"
                  name="price"
                  rules={[{ required: true, message: 'Please enter price' }]}
                >
                  <Input type="number" placeholder="Enter price" size="large" min={0} step={0.01} />
                </Form.Item>

                <Form.Item
                  label="Stock Quantity"
                  name="quantity"
                  rules={[{ required: true, message: 'Please enter quantity' }]}
                >
                  <Input type="number" placeholder="Enter quantity" size="large" min={0} />
                </Form.Item>
              </div>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>

              <Form.Item
                label="Tags (comma separated)"
                name="tags"
              >
                <Input placeholder="organic, fresh, local" />
              </Form.Item>

              <Form.Item
                label="Product Images"
                name="images"
              >
                <Upload
                  listType="picture-card"
                  maxCount={5}
                  beforeUpload={() => false}
                  accept="image/*"
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
                <Text type="secondary" className="text-sm">
                  Upload up to 5 images. First image will be the cover image.
                </Text>
              </Form.Item>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setShowModal(false);
                    form.resetFields();
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

