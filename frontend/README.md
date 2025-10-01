# AgroUdyam Frontend

A modern, responsive Next.js frontend application for AgroUdyam - a platform connecting farmers with customers for fresh produce delivery.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 15, Ant Design, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Authentication**: JWT-based authentication with role-based access control
- **State Management**: React Context for global state (Auth, Cart)
- **API Integration**: Axios-based service layer with error handling
- **Image Optimization**: Next.js Image component with Cloudinary integration
- **Animations**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with validation
- **File Upload**: Drag-and-drop file upload with preview
- **Search & Filter**: Advanced product search and filtering
- **Shopping Cart**: Persistent cart with localStorage
- **Payment Integration**: Stripe payment processing
- **Real-time Updates**: React Query for data fetching and caching

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets
│   ├── images/                # Image assets
│   ├── icons/                 # Icon files
│   └── favicon.ico            # Favicon
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Authentication routes
│   │   │   ├── login/page.js
│   │   │   └── register/page.js
│   │   ├── (dashboard)/      # Protected dashboard routes
│   │   │   ├── farmer/       # Farmer dashboard
│   │   │   ├── customer/     # Customer dashboard
│   │   │   └── admin/        # Admin dashboard
│   │   ├── (main)/           # Public main site
│   │   │   ├── products/     # Product pages
│   │   │   ├── cart/page.js
│   │   │   └── checkout/page.js
│   │   ├── globals.css       # Global styles
│   │   ├── layout.js         # Root layout
│   │   └── page.js           # Homepage
│   ├── components/           # Reusable components
│   │   ├── common/          # Common UI components
│   │   │   ├── AppHeader.js
│   │   │   ├── AppFooter.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── LoadingSpinner.js
│   │   ├── forms/           # Form components
│   │   │   ├── LoginForm.js
│   │   │   └── ProductForm.js
│   │   ├── product/         # Product-specific components
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductList.js
│   │   │   └── ReviewSection.js
│   │   └── home/            # Homepage components
│   │       ├── HeroSection.js
│   │       ├── FeaturedProducts.js
│   │       ├── CategoriesSection.js
│   │       ├── WhyChooseUs.js
│   │       ├── TestimonialsSection.js
│   │       └── StatsSection.js
│   ├── context/             # React Context providers
│   │   ├── AuthContext.js   # Authentication context
│   │   └── CartContext.js   # Shopping cart context
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js       # Auth context hook
│   │   └── useCart.js       # Cart context hook
│   ├── lib/                 # Utility libraries
│   │   ├── AntdRegistry.js  # Ant Design registry
│   │   └── helpers.js       # Helper functions
│   └── services/            # API service layer
│       ├── api.js           # Axios configuration
│       ├── auth.service.js  # Authentication API
│       ├── product.service.js # Product API
│       └── order.service.js # Order API
├── .env.local               # Environment variables
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS + Ant Design
- **State Management**: React Context + Zustand
- **Data Fetching**: React Query + Axios
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Ant Design Icons
- **Image Handling**: Next.js Image + Cloudinary
- **Authentication**: JWT tokens
- **File Upload**: React Dropzone
- **Charts**: Chart.js + React Chart.js 2
- **Notifications**: React Hot Toast

## 📦 Key Dependencies

### Core Dependencies
```json
{
  "next": "^15.5.4",              // React framework
  "react": "^19.1.0",            // React library
  "react-dom": "^19.1.0",        // React DOM
  "antd": "^5.18.0",             // UI component library
  "@ant-design/icons": "^5.3.7", // Ant Design icons
  "tailwindcss": "^4",           // CSS framework
  "axios": "^1.7.2",             // HTTP client
  "react-query": "^3.39.3",      // Data fetching
  "react-hook-form": "^7.48.2",  // Form handling
  "framer-motion": "^10.16.16",  // Animations
  "js-cookie": "^3.0.5",         // Cookie management
  "react-hot-toast": "^2.4.1",   // Notifications
  "zustand": "^4.4.7",           // State management
  "react-dropzone": "^14.2.3",   // File upload
  "chart.js": "^4.4.7",         // Charts
  "react-chartjs-2": "^5.2.0",   // Chart.js React wrapper
  "dayjs": "^1.11.10",           // Date manipulation
  "lodash": "^4.17.21"           // Utility functions
}
```

### Development Dependencies
```json
{
  "eslint": "^9",                // Code linting
  "prettier": "^3.1.0",         // Code formatting
  "typescript": "^5.3.3",       // TypeScript support
  "@types/node": "^20.10.5",    // Node.js types
  "@types/react": "^18.2.45",   // React types
  "@types/react-dom": "^18.2.18" // React DOM types
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krishiConnect/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.local.example .env.local
   
   # Edit the .env.local file with your configuration
   nano .env.local
   ```

4. **Configure Environment Variables**
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_APP_NAME=AgroUdyam
   
   # External Services
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   
   # App URLs
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_ADMIN_URL=http://localhost:3000/admin
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:3000`

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm start           # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

## 🎨 Design System

### Color Palette
- **Primary**: Green (#52c41a)
- **Secondary**: Blue (#1890ff)
- **Success**: Green (#52c41a)
- **Warning**: Orange (#faad14)
- **Error**: Red (#ff4d4f)
- **Text Primary**: Dark Gray (#262626)
- **Text Secondary**: Medium Gray (#8c8c8c)
- **Background**: Light Gray (#fafafa)

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Captions**: Medium weight (500)

### Spacing
- **Base Unit**: 4px
- **Common Spacing**: 8px, 16px, 24px, 32px, 48px, 64px

## 🔐 Authentication Flow

1. **Login/Register**: Users authenticate via JWT tokens
2. **Token Storage**: Access tokens stored in secure HTTP-only cookies
3. **Role-based Access**: Different dashboards based on user roles
4. **Protected Routes**: Route protection based on authentication status
5. **Auto-refresh**: Automatic token refresh for seamless experience

## 🛒 Shopping Cart

- **Persistent Storage**: Cart data saved in localStorage
- **Real-time Updates**: Instant cart updates across components
- **Quantity Management**: Add, remove, update quantities
- **Validation**: Stock availability and quantity limits
- **Checkout Flow**: Seamless transition to checkout process

## 📱 Responsive Design

- **Mobile-first**: Designed for mobile devices first
- **Breakpoints**: 
  - xs: 0px - 576px (Mobile)
  - sm: 576px - 768px (Tablet)
  - md: 768px - 992px (Small Desktop)
  - lg: 992px - 1200px (Desktop)
  - xl: 1200px+ (Large Desktop)

## 🎭 User Roles & Permissions

### Customer
- Browse and search products
- Add items to cart
- Place orders
- Leave reviews
- Manage profile

### Farmer (Owner/Manager/Worker)
- Manage products
- Process orders
- View analytics
- Manage staff (Owner/Manager)
- Handle finances

### Admin
- User management
- System analytics
- Dispute resolution
- Platform settings
- Content moderation

## 🔌 API Integration

### Service Layer Architecture
- **Centralized API calls**: All API calls through service layer
- **Error Handling**: Consistent error handling across the app
- **Request/Response Interceptors**: Automatic token management
- **Type Safety**: TypeScript interfaces for API responses

### Key Services
- **Auth Service**: Authentication and user management
- **Product Service**: Product CRUD and search
- **Order Service**: Order management and tracking
- **Upload Service**: File upload to Cloudinary

## 🎨 Component Architecture

### Component Types
- **Layout Components**: AppHeader, AppFooter, ProtectedRoute
- **UI Components**: LoadingSpinner, ProductCard, Form components
- **Page Components**: Homepage sections, Dashboard pages
- **Feature Components**: Cart, Search, Product management

### Component Patterns
- **Composition over Inheritance**: Flexible component composition
- **Props Interface**: Clear prop definitions
- **Default Props**: Sensible defaults for optional props
- **Error Boundaries**: Graceful error handling

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: React Query for API response caching
- **Memoization**: React.memo for expensive components

## 🧪 Testing Strategy

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API service and context tests
- **E2E Tests**: Critical user flow tests
- **Visual Regression**: UI component testing

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables (Production)
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.agroudyam.com/api/v1
NEXT_PUBLIC_APP_URL=https://agroudyam.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=production-cloudinary
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative static hosting
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email frontend@agroudyam.com or create an issue in the repository.

---

**Built with ❤️ for connecting farmers with customers**