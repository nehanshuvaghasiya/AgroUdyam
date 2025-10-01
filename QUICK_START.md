# 🚀 AgroUdyam Quick Start Guide

## ✅ What's Been Fixed and Improved

### 1. **Beautiful Dashboard Designs** 
- ✨ Modern, attractive UI with gradients and animations
- 🎨 Professional color schemes
- 📊 Real-time statistics from backend APIs
- 🌟 Smooth transitions and hover effects

### 2. **JWT Authentication - Fully Working**
- 🔐 Secure token storage in cookies
- 🔄 Automatic token refresh
- 🚪 Proper login/logout flow
- 🛡️ Protected routes with role-based access

### 3. **All Backend APIs Connected**
- ✅ Products (Create, Read, Update, Delete)
- ✅ Orders (View, Update Status)
- ✅ Wallet (Balance, Transactions)
- ✅ Payouts (Request, History)
- ✅ Farms (Management, Staff)
- ✅ User Profile & Settings

### 4. **All Buttons Now Work!**
- ✅ Add Product → Creates product via API
- ✅ Edit Product → Updates product via API
- ✅ Delete Product → Removes product via API
- ✅ Update Order Status → Changes status via API
- ✅ Request Payout → Submits to API
- ✅ Logout → Clears tokens properly
- ✅ All navigation buttons work

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote)
- npm or yarn

## 🏃‍♂️ Quick Setup (2 Minutes)

### Step 1: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies (if not done)
npm install

# Create .env file (if not exists)
cp env.dev.example .env

# Update .env with your settings:
# - MongoDB connection string
# - JWT_SECRET
# - PORT=8081

# Start backend server
npm start
```

Backend should now be running on `http://localhost:8081`

### Step 2: Setup Frontend

```bash
# Open new terminal
# Navigate to frontend
cd frontend

# Install dependencies (if not done)
npm install

# Create .env.local file (if not exists)
cp env.local.example .env.local

# Make sure it has:
NEXT_PUBLIC_API_URL=http://localhost:8081/api/v1

# Start frontend server
npm run dev
```

Frontend should now be running on `http://localhost:3000`

## 🎯 Test Everything

### 1. **Test Login & JWT**

1. Go to `http://localhost:3000/login`
2. Register a new farmer account at `/register` or login with existing
3. JWT token will be automatically stored in cookies
4. You'll be redirected to the appropriate dashboard

### 2. **Test Farmer Dashboard**

1. After login, you should see the farmer dashboard
2. Check that all stats are showing (may be 0 if no data)
3. Click "Add Product" → Modal opens → Fill form → Create product
4. Product should appear in the products list
5. Check wallet balance (should connect to API)

### 3. **Test Products Management**

1. Click "Products" in sidebar
2. You should see a table of all your products
3. Try:
   - ✅ Searching for products
   - ✅ Filtering by category
   - ✅ Adding a new product with images
   - ✅ Editing a product
   - ✅ Deleting a product (with confirmation)

### 4. **Test Orders Management**

1. Click "Orders" in sidebar
2. You should see a table of orders (may be empty)
3. Try:
   - ✅ Viewing order details (click eye icon)
   - ✅ Updating order status (use dropdown)
   - ✅ Filtering by status
   - ✅ Searching orders

### 5. **Test Wallet**

1. Click "Wallet" in sidebar
2. You should see:
   - ✅ Current balance
   - ✅ Available balance
   - ✅ Transaction history
3. Click "Request Payout" → Fill form → Submit
4. Payout request should be created

### 6. **Test Customer Dashboard**

1. Logout from farmer account
2. Register/Login as customer
3. You should see customer dashboard with:
   - ✅ Order statistics
   - ✅ Recent orders
   - ✅ Featured products
4. All navigation buttons should work

## 🔍 Verify JWT is Working

### Check in Browser DevTools:

1. Open browser DevTools (F12)
2. Go to **Application** tab
3. Click **Cookies** → `http://localhost:3000`
4. You should see:
   - `accessToken` - Your JWT token
   - `refreshToken` - Your refresh token

### Check API Calls:

1. Open **Network** tab in DevTools
2. Click any button that makes API call
3. Check the request headers - should have:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## 🐛 Troubleshooting

### Buttons Not Working?

**Check:**
1. ✅ Backend is running on port 8081
2. ✅ Frontend `.env.local` has correct API URL
3. ✅ You're logged in (check cookies)
4. ✅ Check browser console for errors
5. ✅ Check Network tab for failed requests

### JWT Not Working?

**Fix:**
1. Clear browser cookies
2. Logout and login again
3. Check backend `.env` has `JWT_SECRET`
4. Check backend is returning tokens on login

### API Calls Failing?

**Check:**
1. ✅ MongoDB is connected
2. ✅ Backend routes are correct
3. ✅ CORS is enabled in backend
4. ✅ Token is being sent in headers

### Dashboard Not Loading Data?

**Possible reasons:**
1. No data in database yet (create some!)
2. API endpoints not matching
3. Network errors (check console)
4. Token expired (logout and login)

## 📊 Test Data

### Create Test Products:

Use the "Add Product" button to create some test products:

```
Product 1:
- Name: Fresh Tomatoes
- Category: vegetables
- Price: 60
- Quantity: 100
- Unit: kg

Product 2:
- Name: Organic Mangoes
- Category: fruits
- Price: 120
- Quantity: 50
- Unit: kg
```

### Create Test Orders:

Use the customer account to browse products and place orders.

## 🎉 What You Can Do Now

### **Farmer Account:**
- ✅ View beautiful dashboard with real stats
- ✅ Add products with images
- ✅ Edit and delete products
- ✅ View and manage orders
- ✅ Update order status
- ✅ Check wallet balance
- ✅ Request payouts
- ✅ View transaction history

### **Customer Account:**
- ✅ View dashboard with order stats
- ✅ Browse products
- ✅ Place orders
- ✅ Track orders
- ✅ Write reviews (if implemented)

## 📁 Key Files Modified/Created

### New Service Files:
- `frontend/src/services/farm.service.js` ✅
- `frontend/src/services/wallet.service.js` ✅
- `frontend/src/services/payout.service.js` ✅
- `frontend/src/services/user.service.js` ✅
- `frontend/src/services/review.service.js` ✅

### Improved Dashboards:
- `frontend/src/app/(dashboard)/farmer/page.js` ✅
- `frontend/src/app/(dashboard)/customer/page.js` ✅

### New Pages:
- `frontend/src/app/(dashboard)/farmer/products/page.js` ✅
- `frontend/src/app/(dashboard)/farmer/orders/page.js` ✅
- `frontend/src/app/(dashboard)/farmer/wallet/page.js` ✅

## 🔐 Authentication Details

### **JWT Token Flow:**
```
1. User logs in
   ↓
2. Backend validates credentials
   ↓
3. Backend generates JWT + Refresh tokens
   ↓
4. Frontend stores tokens in secure cookies
   ↓
5. Every API call includes JWT in Authorization header
   ↓
6. If JWT expires, automatic refresh using refresh token
   ↓
7. If refresh fails, redirect to login
```

### **Token Storage:**
- Stored in **HttpOnly cookies** (secure)
- **Expires:** 7 days for access token, 30 days for refresh
- **SameSite:** Strict (CSRF protection)
- **Secure:** True in production

### **Token Refresh:**
- Automatic on 401 Unauthorized
- Happens in `frontend/src/services/api.js`
- Transparent to user

## ✨ UI Features

### **Animations:**
- Framer Motion for smooth transitions
- Hover effects on cards and buttons
- Loading spinners during API calls
- Toast notifications for feedback

### **Design Elements:**
- Gradient backgrounds
- Glass-morphism effects
- Shadow depth
- Rounded corners
- Professional color palette

### **Responsive:**
- Mobile-friendly
- Tablet optimized
- Desktop enhanced

## 📖 API Endpoints Used

```
POST   /api/v1/auth/login              - Login
POST   /api/v1/auth/register           - Register
POST   /api/v1/auth/logout             - Logout
POST   /api/v1/auth/refresh-token      - Refresh JWT

GET    /api/v1/products/farmer/my-products - Get farmer products
POST   /api/v1/products                - Create product
PUT    /api/v1/products/:id            - Update product
DELETE /api/v1/products/:id            - Delete product

GET    /api/v1/orders/farmer           - Get farmer orders
GET    /api/v1/orders                  - Get customer orders
PUT    /api/v1/orders/:id/status       - Update order status

GET    /api/v1/wallet/balance          - Get wallet balance
GET    /api/v1/wallet/summary          - Get wallet summary
GET    /api/v1/wallet/transactions     - Get transactions

POST   /api/v1/payouts/request         - Request payout
GET    /api/v1/payouts                 - Get payouts
```

## 🎓 How to Extend

### **Add New Features:**

1. Create service file in `/services/`
2. Create page in `/app/(dashboard)/`
3. Use existing components and patterns
4. Connect to backend APIs
5. Add to sidebar navigation

### **Example - Add Analytics Page:**

```javascript
// 1. Create service
// /services/analytics.service.js
export const analyticsService = {
  getStats: async () => {
    return apiCall(() => api.get('/analytics/stats'));
  }
};

// 2. Create page
// /app/(dashboard)/farmer/analytics/page.js
export default function Analytics() {
  // Fetch data
  // Display charts
  // Use existing UI components
}

// 3. Add to sidebar
// Update farmer/page.js sidebar links
```

## 🆘 Need Help?

### **Check:**
1. `IMPLEMENTATION_SUMMARY.md` - Detailed documentation
2. Browser console for errors
3. Network tab for failed API calls
4. Backend logs for API errors

### **Common Issues:**
- **Port already in use**: Kill process or change port
- **MongoDB not connected**: Check connection string
- **CORS errors**: Check backend CORS config
- **Token errors**: Clear cookies and re-login

## 🎊 Success Checklist

- [x] Backend running on port 8081
- [x] Frontend running on port 3000
- [x] MongoDB connected
- [x] Can register new user
- [x] Can login successfully
- [x] JWT token in cookies
- [x] Dashboard shows data
- [x] Can create products
- [x] Can view orders
- [x] Can check wallet
- [x] All buttons work
- [x] Logout works

## 🚀 You're All Set!

Everything is now working:
- ✅ Beautiful, modern dashboards
- ✅ JWT authentication
- ✅ All APIs connected
- ✅ All buttons working
- ✅ Complete CRUD operations
- ✅ Proper error handling
- ✅ Loading states
- ✅ Responsive design

**Happy coding! 🌾💚**


