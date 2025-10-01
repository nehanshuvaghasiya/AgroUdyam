# 🚀 AgroUdyam Frontend Setup Guide

This guide will help you set up and run the AgroUdyam frontend application.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js (v18 or higher)
- ✅ npm (v9 or higher)
- ✅ Backend API running (default: http://localhost:8081)

## 🔧 Required Files for Starting the Project

### 1. **Environment Variables** (`.env.local`)
**Status:** ✅ Created
**Location:** `/frontend/.env.local`

This file contains all environment configuration. Key variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8081/api/v1)
- `NEXT_PUBLIC_APP_URL` - Frontend URL (default: http://localhost:3000)

### 2. **Dependencies** (`node_modules/`)
**Status:** ✅ Installed
**Location:** `/frontend/node_modules/`

All npm packages are installed.

### 3. **Configuration Files**
**Status:** ✅ All Present

Required config files:
- ✅ `package.json` - Dependencies and scripts
- ✅ `next.config.js` - Next.js configuration
- ✅ `jsconfig.json` - Path aliases configuration
- ✅ `postcss.config.mjs` - PostCSS configuration
- ✅ `eslint.config.mjs` - ESLint configuration

### 4. **Source Files**
**Status:** ✅ All Present

Required directories:
- ✅ `src/app/` - Next.js App Router pages
- ✅ `src/components/` - React components
- ✅ `src/context/` - React Context providers
- ✅ `src/services/` - API service layer
- ✅ `src/lib/` - Utility libraries

## 🎯 Quick Start

### Step 1: Install Dependencies (if not done)
```bash
cd /Users/nehanshu/Workspace/AgroUdyam/frontend
npm install
```

### Step 2: Configure Environment
The `.env.local` file has been created with default values.

**Important:** Update these values if needed:
- `NEXT_PUBLIC_API_URL` - Must match your backend URL
- External service keys (Cloudinary, Stripe, etc.)

### Step 3: Start Development Server
```bash
npm run dev
```

The application will start on:
- **http://localhost:3000** (or next available port like 3001, 3002)

### Step 4: Build for Production (Optional)
```bash
npm run build
npm start
```

## 🔑 Key Features

### Authentication Pages
- ✅ `/login` - User login page
- ✅ `/register` - User registration page

### Dashboards
- ✅ `/farmer` - Farmer dashboard
- ✅ `/customer` - Customer dashboard

### Public Pages
- ✅ `/` - Home page
- ✅ `/products` - Products listing

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |

## 🐛 Troubleshooting

### Issue: Port Already in Use
**Solution:** Next.js will automatically try the next available port (3001, 3002, etc.)

### Issue: API Connection Failed
**Solution:** 
1. Ensure backend is running on http://localhost:8081
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS is configured in backend

### Issue: Module Not Found
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Component Import Errors
**Solution:**
- All UI components should be imported from `@/components/ui`
- Do NOT import directly from `antd` for wrapped components

### Issue: Blank Page / Nothing Shows
**Solution:**
1. Check browser console for errors (F12)
2. Clear Next.js cache: `rm -rf .next`
3. Restart dev server: `npm run dev`
4. Check if all required services are accessible

## 🔒 Environment Variables Checklist

### Required (Already Configured)
- ✅ `NEXT_PUBLIC_API_URL` - Backend API endpoint
- ✅ `NEXT_PUBLIC_APP_URL` - Frontend URL

### Optional (Configure when needed)
- ⚠️ `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - For image uploads
- ⚠️ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - For payments
- ⚠️ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For maps (if using)

## 📁 Essential File Structure

```
frontend/
├── .env.local              ✅ Environment variables
├── package.json            ✅ Dependencies
├── next.config.js          ✅ Next.js config
├── jsconfig.json           ✅ Path aliases
├── src/
│   ├── app/                ✅ Pages & layouts
│   ├── components/         ✅ React components
│   ├── context/            ✅ Context providers
│   ├── services/           ✅ API services
│   └── lib/                ✅ Utilities
└── public/                 ✅ Static assets
```

## ✅ All Files Are Present!

Your frontend is **fully configured** and ready to run! 🎉

### To Start:
```bash
cd /Users/nehanshu/Workspace/AgroUdyam/frontend
npm run dev
```

Then open **http://localhost:3000** in your browser.

## 🔗 Related Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design Documentation](https://ant.design/components/overview/)
- [React Documentation](https://react.dev)

## 💡 Tips

1. **UI Components:** Always import from `@/components/ui` (not `antd`)
2. **API Calls:** Use services in `src/services/` directory
3. **Authentication:** Managed by `AuthContext` (`src/context/AuthContext.js`)
4. **Routing:** Next.js App Router (file-based routing in `src/app/`)

## 🆘 Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Check terminal for build errors
3. Verify backend is running
4. Clear `.next` cache and restart

---

**Project:** AgroUdyam (AgroUdyam)
**Version:** 1.0.0
**Last Updated:** October 2025

