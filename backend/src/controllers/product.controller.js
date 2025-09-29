const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Product = require('../models/product.model');
const { uploadToCloudinary } = require('../integrations/cloudinary.service');
const { PRODUCT_CATEGORIES } = require('../constants');

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, unit, tags } = req.body;
  const farmerId = req.user.id;

  // Handle image upload
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.path);
      images.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    quantity,
    unit,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    images,
    farmer: farmerId
  });

  res.status(201).json(new ApiResponse(201, product, 'Product created successfully'));
});

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;
  const search = req.query.search;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const farmerId = req.query.farmer;

  const filter = { isActive: true };
  
  if (category) filter.category = category;
  if (farmerId) filter.farmer = farmerId;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  const products = await Product.find(filter)
    .populate('farmer', 'name email phone')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Products retrieved successfully'));
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId)
    .populate('farmer', 'name email phone')
    .populate('reviews.user', 'name');

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(new ApiResponse(200, product, 'Product retrieved successfully'));
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const farmerId = req.user.id;
  const updateData = req.body;

  const product = await Product.findOne({ _id: productId, farmer: farmerId });
  if (!product) {
    throw new ApiError(404, 'Product not found or you do not have permission to update it');
  }

  // Handle new image uploads
  if (req.files && req.files.length > 0) {
    const newImages = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.path);
      newImages.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }
    updateData.images = [...product.images, ...newImages];
  }

  // Handle tag updates
  if (updateData.tags) {
    updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const farmerId = req.user.id;

  const product = await Product.findOne({ _id: productId, farmer: farmerId });
  if (!product) {
    throw new ApiError(404, 'Product not found or you do not have permission to delete it');
  }

  // Soft delete by setting isActive to false
  product.isActive = false;
  await product.save();

  res.status(200).json(new ApiResponse(200, null, 'Product deleted successfully'));
});

// Get farmer products
const getFarmerProducts = asyncHandler(async (req, res) => {
  const farmerId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  const filter = { farmer: farmerId };
  if (status === 'active') filter.isActive = true;
  if (status === 'inactive') filter.isActive = false;

  const products = await Product.find(filter)
    .populate('farmer', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Farmer products retrieved successfully'));
});

// Update product stock
const updateProductStock = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const farmerId = req.user.id;

  const product = await Product.findOne({ _id: productId, farmer: farmerId });
  if (!product) {
    throw new ApiError(404, 'Product not found or you do not have permission to update it');
  }

  product.quantity = quantity;
  await product.save();

  res.status(200).json(new ApiResponse(200, product, 'Product stock updated successfully'));
});

// Get product categories
const getProductCategories = asyncHandler(async (req, res) => {
  const categories = Object.values(PRODUCT_CATEGORIES);
  res.status(200).json(new ApiResponse(200, categories, 'Product categories retrieved successfully'));
});

// Search products
const searchProducts = asyncHandler(async (req, res) => {
  const { q, category, minPrice, maxPrice, farmer } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filter = { isActive: true };

  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { tags: { $in: [new RegExp(q, 'i')] } }
    ];
  }

  if (category) filter.category = category;
  if (farmer) filter.farmer = farmer;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  const products = await Product.find(filter)
    .populate('farmer', 'name email phone')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Search results retrieved successfully'));
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
  updateProductStock,
  getProductCategories,
  searchProducts
};
