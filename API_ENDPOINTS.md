# 🔗 AgroUdyam API Endpoints Reference

## Base URL
```
http://localhost:8081/api/v1
```

---

## 🔐 Authentication Endpoints

### Register User
```
POST http://localhost:8081/api/v1/auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91 9876543210",
  "userType": "customer",  // or "farmer"
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  }
}
```

### Login User
```
POST http://localhost:8081/api/v1/auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Forgot Password
```
POST http://localhost:8081/api/v1/auth/forgot-password
```
**Body:**
```json
{
  "email": "john@example.com"
}
```

### Reset Password
```
POST http://localhost:8081/api/v1/auth/reset-password
```
**Body:**
```json
{
  "token": "reset-token-here",
  "password": "newPassword123"
}
```

### Change Password (Authenticated)
```
POST http://localhost:8081/api/v1/auth/change-password
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "currentPassword": "oldPassword",
  "newPassword": "newPassword123"
}
```

### Logout (Authenticated)
```
POST http://localhost:8081/api/v1/auth/logout
Headers: Authorization: Bearer <token>
```

---

## 👤 User Endpoints

### Get User Profile (Authenticated)
```
GET http://localhost:8081/api/v1/users/profile
Headers: Authorization: Bearer <token>
```

### Update User Profile (Authenticated)
```
PUT http://localhost:8081/api/v1/users/profile
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "name": "John Updated",
  "phone": "+91 9876543210",
  "address": {
    "street": "456 New St",
    "city": "Delhi",
    "state": "Delhi",
    "zipCode": "110001"
  }
}
```

---

## 🛍️ Product Endpoints

### Get All Products
```
GET http://localhost:8081/api/v1/products
Query Params: ?page=1&limit=10&category=vegetables&sort=-createdAt
```

### Get Single Product
```
GET http://localhost:8081/api/v1/products/:productId
```

### Create Product (Farmer Only)
```
POST http://localhost:8081/api/v1/products
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
```
**Body (Form Data):**
- name: "Fresh Tomatoes"
- description: "Organic tomatoes"
- price: 120
- quantity: 50
- unit: "kg"
- category: "vegetables"
- images: [file, file]

### Update Product (Farmer Only)
```
PUT http://localhost:8081/api/v1/products/:productId
Headers: Authorization: Bearer <token>
```

### Delete Product (Farmer Only)
```
DELETE http://localhost:8081/api/v1/products/:productId
Headers: Authorization: Bearer <token>
```

### Get Farmer Products (Farmer Only)
```
GET http://localhost:8081/api/v1/products/farmer/my-products
Headers: Authorization: Bearer <token>
```

---

## 📦 Order Endpoints

### Create Order (Customer)
```
POST http://localhost:8081/api/v1/orders
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "items": [
    {
      "product": "productId123",
      "quantity": 5,
      "price": 120
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "paymentMethod": "stripe"
}
```

### Get User Orders (Authenticated)
```
GET http://localhost:8081/api/v1/orders/my-orders
Headers: Authorization: Bearer <token>
```

### Get Single Order (Authenticated)
```
GET http://localhost:8081/api/v1/orders/:orderId
Headers: Authorization: Bearer <token>
```

### Update Order Status (Farmer/Admin)
```
PATCH http://localhost:8081/api/v1/orders/:orderId/status
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "status": "processing"  // pending, processing, shipped, delivered, cancelled
}
```

---

## 🏪 Farm Endpoints

### Get All Farms
```
GET http://localhost:8081/api/v1/farms
```

### Get Single Farm
```
GET http://localhost:8081/api/v1/farms/:farmId
```

### Create Farm (Farmer)
```
POST http://localhost:8081/api/v1/farms
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "name": "Green Valley Farm",
  "description": "Organic vegetables farm",
  "location": {
    "address": "Rural Area",
    "city": "Pune",
    "state": "Maharashtra",
    "coordinates": [18.5204, 73.8567]
  },
  "certifications": ["Organic", "Non-GMO"]
}
```

### Update Farm (Farmer)
```
PUT http://localhost:8081/api/v1/farms/:farmId
Headers: Authorization: Bearer <token>
```

---

## 💰 Payout Endpoints (Farmer)

### Request Payout
```
POST http://localhost:8081/api/v1/payouts/request
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "amount": 5000,
  "bankDetails": {
    "accountNumber": "1234567890",
    "ifscCode": "SBIN0001234",
    "accountHolderName": "John Farmer"
  }
}
```

### Get Farmer Payouts
```
GET http://localhost:8081/api/v1/payouts/my-payouts
Headers: Authorization: Bearer <token>
```

---

## 👨‍💼 Admin Endpoints

### Get All Users (Admin)
```
GET http://localhost:8081/api/v1/admin/users
Headers: Authorization: Bearer <token>
```

### Get Dashboard Stats (Admin)
```
GET http://localhost:8081/api/v1/admin/dashboard-stats
Headers: Authorization: Bearer <token>
```

### Update User Role (Admin)
```
PATCH http://localhost:8081/api/v1/admin/users/:userId/role
Headers: Authorization: Bearer <token>
```
**Body:**
```json
{
  "role": "farmer"  // customer, farmer, admin
}
```

---

## 🏥 Health Check

### Server Health
```
GET http://localhost:8081/health
```

### API Health
```
GET http://localhost:8081/api/v1/health
```

---

## 📝 Common Response Formats

### Success Response
```json
{
  "status": "success",
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [ ... ]  // validation errors
}
```

---

## 🔑 Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The token is returned in the login/register response:
```json
{
  "status": "success",
  "data": {
    "user": { ... },
    "token": "your-jwt-token-here"
  }
}
```

---

## 🚨 Common Error Codes

- **400** - Bad Request (Validation error)
- **401** - Unauthorized (Invalid/missing token)
- **403** - Forbidden (Insufficient permissions)
- **404** - Not Found
- **429** - Too Many Requests (Rate limit)
- **500** - Internal Server Error

---

## 💡 Testing Tips

### Using cURL:
```bash
# Register
curl -X POST http://localhost:8081/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:8081/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Using Postman:
1. Import this file as a collection
2. Set base URL variable: `{{baseUrl}}` = `http://localhost:8081/api/v1`
3. Use environment variables for tokens

---

**Important Notes:**
- ✅ Base URL is: `http://localhost:8081/api/v1`
- ✅ NOT: `http://localhost:8081/v1` ❌
- ✅ Frontend API URL configured in `.env.local`
- ✅ Backend port configured in `.env` (default: 8081)

---

**Project:** AgroUdyam
**Last Updated:** October 1, 2025
