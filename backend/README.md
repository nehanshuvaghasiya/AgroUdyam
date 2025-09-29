# KrishiConnect Backend API

A comprehensive Node.js backend API for KrishiConnect - a platform connecting farmers with customers for fresh produce delivery.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Multi-role user system (Admin, Farm Owner, Farm Manager, Farm Worker, Customer)
- **Farm Management**: Farm creation, staff management, and role assignments
- **Product Management**: CRUD operations with image upload via Cloudinary
- **Order Management**: Complete order lifecycle with status tracking
- **Payment Integration**: Stripe payment processing
- **Review System**: Product and farmer reviews with ratings
- **Wallet System**: Digital wallet for farmers with payout requests
- **Admin Dashboard**: Analytics and system management
- **Email Notifications**: Transactional emails via Nodemailer
- **File Upload**: Image handling with Cloudinary integration

## 📁 Project Structure

```
backend/
├── .env                     # Environment variables (create from .env.example)
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── server.js               # Main entry point
├── README.md               # This file
└── src/
    ├── app.js              # Express app configuration
    ├── config/
    │   └── db.config.js   # MongoDB connection setup
    ├── constants.js        # Application constants and enums
    ├── controllers/        # Business logic controllers
    │   ├── admin.controller.js      # Admin dashboard & user management
    │   ├── auth.controller.js       # Authentication & user registration
    │   ├── farm.controller.js       # Farm management & staff operations
    │   ├── order.controller.js     # Order creation & management
    │   ├── payout.controller.js    # Payout requests & processing
    │   ├── product.controller.js   # Product CRUD operations
    │   ├── review.controller.js    # Review & rating system
    │   ├── user.controller.js       # User profile management
    │   └── wallet.controller.js    # Wallet & transaction management
    ├── integrations/       # External service integrations
    │   ├── cloudinary.service.js   # Image upload & management
    │   ├── nodemailer.service.js   # Email service
    │   └── stripe.service.js       # Payment processing
    ├── middleware/         # Express middleware
    │   ├── auth.middleware.js      # JWT authentication
    │   ├── error.middleware.js     # Global error handling
    │   ├── multer.middleware.js    # File upload handling
    │   └── permission.middleware.js # Permission-based access control
    ├── models/             # Mongoose schemas
    │   ├── dispute.model.js        # Order disputes
    │   ├── farm.model.js           # Farm information
    │   ├── order.model.js          # Customer orders
    │   ├── payout.model.js         # Farmer payouts
    │   ├── permission.model.js     # System permissions
    │   ├── product.model.js        # Product listings
    │   ├── review.model.js         # Product reviews
    │   ├── role.model.js           # User roles
    │   ├── user.model.js           # User accounts
    │   └── wallet.model.js         # Digital wallets
    ├── routes/             # API route definitions
    │   ├── admin.routes.js         # Admin panel routes
    │   ├── auth.routes.js          # Authentication routes
    │   ├── farm.routes.js          # Farm management routes
    │   ├── index.js                # Route aggregator
    │   ├── order.routes.js         # Order management routes
    │   ├── payout.routes.js        # Payout routes
    │   ├── product.routes.js       # Product routes
    │   └── user.routes.js          # User profile routes
    ├── utils/              # Utility functions
    │   ├── ApiError.js             # Custom error class
    │   ├── ApiResponse.js          # Standardized response format
    │   ├── asyncHandler.js         # Async error wrapper
    │   ├── jwt.utils.js            # JWT token utilities
    │   └── validation.js           # Input validation helpers
    └── validations/       # Input validation schemas
        ├── auth.validation.js      # Authentication validation
        ├── order.validation.js     # Order validation
        ├── product.validation.js   # Product validation
        └── review.validation.js    # Review validation
```

## 🛠️ Tech Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Payment**: Stripe API
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon, ESLint, Prettier

## 📦 Dependencies

### Core Dependencies

```json
{
  "express": "^4.18.2",           // Web framework
  "mongoose": "^7.5.0",          // MongoDB ODM
  "bcryptjs": "^2.4.3",          // Password hashing
  "jsonwebtoken": "^9.0.2",      // JWT authentication
  "cors": "^2.8.5",              // Cross-origin resource sharing
  "helmet": "^7.0.0",            // Security headers
  "express-rate-limit": "^6.10.0", // Rate limiting
  "express-validator": "^7.0.1",  // Input validation
  "multer": "^1.4.5-lts.1",      // File upload handling
  "cloudinary": "^1.40.0",       // Image management
  "stripe": "^13.5.0",           // Payment processing
  "nodemailer": "^6.9.4",        // Email service
  "dotenv": "^16.3.1",           // Environment variables
  "compression": "^1.7.4",       // Response compression
  "morgan": "^1.10.0",           // HTTP request logger
  "cookie-parser": "^1.4.6",    // Cookie parsing
  "express-mongo-sanitize": "^2.2.0", // NoSQL injection prevention
  "hpp": "^0.2.3",               // HTTP parameter pollution
  "xss-clean": "^0.1.4"          // XSS protection
}
```

### Development Dependencies

```json
{
  "nodemon": "^3.0.1",           // Development server
  "jest": "^29.6.2",             // Testing framework
  "supertest": "^6.3.3",        // HTTP testing
  "eslint": "^8.47.0",          // Code linting
  "eslint-config-airbnb-base": "^15.0.0", // ESLint config
  "eslint-plugin-import": "^2.28.1",     // ESLint import plugin
  "prettier": "^3.0.1"          // Code formatting
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd krishiConnect/backend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Environment Setup**

   ```bash
   # Copy the example environment file
   cp env.dev.example .env

   # Edit the .env file with your configuration
   nano .env
   ```
4. **Configure Environment Variables**

   ```env
   # Database
   DATABASE_URI=mongodb://localhost:27017/krishiConnect

   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-refresh-token-secret

   # Server
   PORT=5000
   NODE_ENV=development

   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Stripe (for payments)
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

   # Email (for notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```
5. **Start the development server**

   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server with nodemon
npm start           # Start production server

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
npm run format      # Format code with Prettier

# Database
npm run seed        # Seed database with sample data
```

## 🔐 Authentication & Authorization

### User Roles

- **Admin**: Full system access
- **Farm Owner**: Farm management, product management
- **Farm Manager**: Product management, order processing
- **Farm Worker**: Limited product access
- **Customer**: Order placement, reviews

### Permission System

The system uses a granular permission-based access control:

- Product permissions (create, read, update, delete)
- Order permissions (create, read, update, delete)
- User management permissions
- Farm management permissions
- Financial permissions (payouts, wallet)
- Admin permissions (analytics, system management)

### JWT Token Structure

```json
{
  "id": "user_id",
  "iat": "issued_at_timestamp",
  "exp": "expiration_timestamp"
}
```

## 🗄️ Database Schema

### Core Models

- **User**: User accounts with role-based access
- **Role**: User roles with associated permissions
- **Permission**: Individual system permissions
- **Farm**: Farm information and staff management
- **Product**: Product listings with images and details
- **Order**: Customer orders with status tracking
- **Review**: Product and farmer reviews
- **Wallet**: Digital wallet for farmers
- **Payout**: Payout requests and processing
- **Dispute**: Order dispute management

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth`)

- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset
- `POST /change-password` - Change password

### User Routes (`/api/v1/users`)

- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /avatar` - Update user avatar
- `GET /stats` - Get user statistics
- `DELETE /account` - Delete user account

### Product Routes (`/api/v1/products`)

- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `POST /` - Create product (farmer only)
- `PUT /:id` - Update product
- `DELETE /:id` - Delete product
- `GET /search` - Search products
- `GET /categories` - Get product categories

### Order Routes (`/api/v1/orders`)

- `POST /` - Create order
- `GET /` - Get user orders
- `GET /:id` - Get order by ID
- `PUT /:id/status` - Update order status
- `PUT /:id/cancel` - Cancel order

### Farm Routes (`/api/v1/farms`)

- `POST /` - Create farm
- `GET /my-farm` - Get farm details
- `PUT /my-farm` - Update farm details
- `POST /invite-staff` - Invite staff
- `GET /:id/staff` - Get farm staff
- `PUT /staff/:id/role` - Update staff role

### Admin Routes (`/api/v1/admin`)

- `GET /dashboard` - Get dashboard analytics
- `GET /users` - Get all users
- `PUT /users/:id/role` - Update user role
- `PUT /users/:id/status` - Toggle user status
- `GET /settings` - Get system settings
- `PUT /settings` - Update system settings

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Cross-origin request security
- **Helmet**: Security headers
- **Input Validation**: Comprehensive input sanitization
- **XSS Protection**: Cross-site scripting prevention
- **NoSQL Injection Prevention**: MongoDB injection protection
- **File Upload Security**: Secure file handling

## 📧 Email Integration

The system sends various transactional emails:

- Welcome emails
- Order confirmations
- Order status updates
- Password reset emails
- Staff invitations
- Payout notifications

## 💳 Payment Integration

- **Stripe Integration**: Secure payment processing
- **Multiple Payment Methods**: Card, wallet, COD
- **Payout System**: Automated farmer payouts
- **Transaction Tracking**: Complete payment history

## 🖼️ File Upload

- **Cloudinary Integration**: Cloud-based image storage
- **Image Optimization**: Automatic optimization
- **Multiple Formats**: JPEG, PNG, WebP support
- **Size Limits**: Configurable file size limits

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Production Environment Variables

```env
NODE_ENV=production
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/krishiConnect
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
CLOUDINARY_CLOUD_NAME=your-production-cloudinary
EMAIL_HOST=your-production-smtp-host
```

### Deployment Steps

1. Set up production MongoDB instance
2. Configure production environment variables
3. Set up Cloudinary production account
4. Configure Stripe live keys
5. Set up email service
6. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

## 📊 Monitoring & Logging

- **Request Logging**: Morgan HTTP logger
- **Error Tracking**: Comprehensive error handling
- **Performance Monitoring**: Response time tracking
- **Health Checks**: Server health endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@krishiconnect.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - User authentication and authorization
  - Product management
  - Order processing
  - Payment integration
  - Admin dashboard

---

**Built with ❤️ for connecting farmers with customers**
