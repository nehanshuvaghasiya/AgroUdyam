'use client';

import Link from 'next/link';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';

const { Footer } = Layout;
const { Title, Text } = Typography;

export const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Mission', href: '/mission' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    products: [
      { label: 'Fresh Vegetables', href: '/products?category=vegetables' },
      { label: 'Organic Fruits', href: '/products?category=fruits' },
      { label: 'Grains & Cereals', href: '/products?category=grains' },
      { label: 'Spices & Herbs', href: '/products?category=spices' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Refund Policy', href: '/refund' },
    ],
  };

  const socialLinks = [
    { icon: <FacebookOutlined />, href: '#', label: 'Facebook' },
    { icon: <TwitterOutlined />, href: '#', label: 'Twitter' },
    { icon: <InstagramOutlined />, href: '#', label: 'Instagram' },
    { icon: <LinkedinOutlined />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <Footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <Title level={4} className="text-white mb-0">
                  KrishiConnect
                </Title>
              </div>
              <Text className="text-gray-300">
                Connecting farmers with customers for fresh, organic produce delivered 
                directly from farm to your table.
              </Text>
              <Space size="middle">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </Space>
            </div>
          </Col>

          {/* Company Links */}
          <Col xs={24} sm={12} md={6}>
            <div className="space-y-4">
              <Title level={5} className="text-white mb-4">
                Company
              </Title>
              <div className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Products Links */}
          <Col xs={24} sm={12} md={6}>
            <div className="space-y-4">
              <Title level={5} className="text-white mb-4">
                Products
              </Title>
              <div className="space-y-2">
                {footerLinks.products.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Support Links */}
          <Col xs={24} sm={12} md={6}>
            <div className="space-y-4">
              <Title level={5} className="text-white mb-4">
                Support
              </Title>
              <div className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Divider className="bg-gray-700 my-8" />

        {/* Contact Info */}
        <Row gutter={[32, 16]} className="mb-8">
          <Col xs={24} sm={8}>
            <div className="flex items-center space-x-3">
              <MailOutlined className="text-green-400" />
              <div>
                <Text className="text-gray-300 block">Email</Text>
                <Text className="text-white">support@krishiconnect.com</Text>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="flex items-center space-x-3">
              <PhoneOutlined className="text-green-400" />
              <div>
                <Text className="text-gray-300 block">Phone</Text>
                <Text className="text-white">+1 (555) 123-4567</Text>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="flex items-center space-x-3">
              <EnvironmentOutlined className="text-green-400" />
              <div>
                <Text className="text-gray-300 block">Address</Text>
                <Text className="text-white">123 Farm Street, Agriculture City</Text>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className="bg-gray-700 my-8" />

        {/* Bottom Footer */}
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text className="text-gray-400">
              © {currentYear} KrishiConnect. All rights reserved.
            </Text>
          </Col>
          <Col xs={24} sm={12}>
            <div className="flex flex-wrap justify-end space-x-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Col>
        </Row>

        {/* Made with Love */}
        <div className="text-center mt-8">
          <Text className="text-gray-500 text-sm">
            Made with <HeartOutlined className="text-red-500" /> for farmers and customers
          </Text>
        </div>
      </div>
    </Footer>
  );
};
