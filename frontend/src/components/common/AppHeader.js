'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  ShopOutlined,
  HomeOutlined,
  TeamOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { 
  Layout, 
  Menu, 
  Button, 
  Input, 
  Badge, 
  Dropdown, 
  Avatar, 
  Drawer,
  Space,
  Typography,
  Divider
} from 'antd';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { productService } from '@/services/product.service';

const { Header } = Layout;
const { Search } = Input;
const { Text } = Typography;

export const AppHeader = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  
  const { user, isAuthenticated, logout, hasRole, hasAnyRole } = useAuth();
  const { getItemCount } = useCart();
  const router = useRouter();

  const cartItemCount = getItemCount();

  // Search functionality
  const handleSearch = async (value) => {
    if (!value.trim()) return;
    
    setSearchLoading(true);
    try {
      const response = await productService.searchProducts({ q: value, limit: 5 });
      if (response.success) {
        setSearchResults(response.data.products || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  // User menu items
  const getUserMenuItems = () => {
    const items = [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Profile',
        onClick: () => router.push('/profile'),
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
        onClick: () => router.push('/settings'),
      },
    ];

    if (hasAnyRole(['farm_owner', 'farm_manager', 'farm_worker'])) {
      items.push({
        key: 'farmer-dashboard',
        icon: <ShopOutlined />,
        label: 'Farmer Dashboard',
        onClick: () => router.push('/farmer'),
      });
    }

    if (hasRole('admin')) {
      items.push({
        key: 'admin-dashboard',
        icon: <BarChartOutlined />,
        label: 'Admin Dashboard',
        onClick: () => router.push('/admin'),
      });
    }

    items.push({
      type: 'divider',
    });

    items.push({
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    });

    return items;
  };

  // Mobile menu items
  const getMobileMenuItems = () => {
    const items = [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: 'Home',
        onClick: () => {
          router.push('/');
          setMobileMenuVisible(false);
        },
      },
      {
        key: 'products',
        icon: <ShopOutlined />,
        label: 'Products',
        onClick: () => {
          router.push('/products');
          setMobileMenuVisible(false);
        },
      },
    ];

    if (isAuthenticated) {
      items.push({
        key: 'cart',
        icon: <ShoppingCartOutlined />,
        label: `Cart (${cartItemCount})`,
        onClick: () => {
          router.push('/cart');
          setMobileMenuVisible(false);
        },
      });

      if (hasAnyRole(['farm_owner', 'farm_manager', 'farm_worker'])) {
        items.push({
          key: 'farmer',
          icon: <ShopOutlined />,
          label: 'Farmer Dashboard',
          onClick: () => {
            router.push('/farmer');
            setMobileMenuVisible(false);
          },
        });
      }

      if (hasRole('admin')) {
        items.push({
          key: 'admin',
          icon: <BarChartOutlined />,
          label: 'Admin Dashboard',
          onClick: () => {
            router.push('/admin');
            setMobileMenuVisible(false);
          },
        });
      }
    }

    return items;
  };

  return (
    <Header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KrishiConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Search
              placeholder="Search products..."
              allowClear
              loading={searchLoading}
              onSearch={handleSearch}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Badge count={cartItemCount} size="small">
                <Button 
                  type="text" 
                  icon={<ShoppingCartOutlined />} 
                  className="text-gray-700 hover:text-green-600"
                />
              </Badge>
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                className="text-gray-700 hover:text-green-600"
              />
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <Dropdown
                menu={{ items: getUserMenuItems() }}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button type="text" className="flex items-center space-x-2">
                  <Avatar 
                    size="small" 
                    icon={<UserOutlined />}
                    src={user?.avatar?.url}
                  />
                  <span className="hidden sm:block text-gray-700">
                    {user?.name || 'User'}
                  </span>
                </Button>
              </Dropdown>
            ) : (
              <Space>
                <Button 
                  type="text" 
                  onClick={() => router.push('/login')}
                  className="text-gray-700 hover:text-green-600"
                >
                  Login
                </Button>
                <Button 
                  type="primary" 
                  onClick={() => router.push('/register')}
                  className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Sign Up
                </Button>
              </Space>
            )}

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              className="md:hidden text-gray-700 hover:text-green-600"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
        closeIcon={<CloseOutlined />}
      >
        <div className="space-y-4">
          {/* Mobile Search */}
          <Search
            placeholder="Search products..."
            allowClear
            loading={searchLoading}
            onSearch={handleSearch}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Divider />

          {/* Mobile Menu Items */}
          <Menu
            mode="vertical"
            items={getMobileMenuItems()}
            className="border-none"
          />

          {!isAuthenticated && (
            <>
              <Divider />
              <Space direction="vertical" className="w-full">
                <Button 
                  type="text" 
                  onClick={() => {
                    router.push('/login');
                    setMobileMenuVisible(false);
                  }}
                  className="w-full text-left"
                >
                  Login
                </Button>
                <Button 
                  type="primary" 
                  onClick={() => {
                    router.push('/register');
                    setMobileMenuVisible(false);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Sign Up
                </Button>
              </Space>
            </>
          )}
        </div>
      </Drawer>
    </Header>
  );
};
