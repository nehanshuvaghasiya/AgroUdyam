const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const { ORDER_STATUS } = require('../constants');

// Create order
const createOrder = asyncHandler(async (req, res) => {
  const { products, shippingAddress, paymentMethod, notes } = req.body;
  const customerId = req.user.id;

  // Validate products
  if (!products || products.length === 0) {
    throw new ApiError(400, 'Order must contain at least one product');
  }

  // Calculate total amount and validate products
  let totalAmount = 0;
  const orderProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new ApiError(404, `Product with ID ${item.productId} not found`);
    }

    if (product.quantity < item.quantity) {
      throw new ApiError(400, `Insufficient stock for product ${product.name}`);
    }

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    orderProducts.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price,
      total: itemTotal
    });
  }

  // Create order
  const order = await Order.create({
    customer: customerId,
    products: orderProducts,
    totalAmount,
    shippingAddress,
    paymentMethod,
    notes,
    status: ORDER_STATUS.PENDING
  });

  // Update product quantities
  for (const item of products) {
    await Product.findByIdAndUpdate(
      item.productId,
      { $inc: { quantity: -item.quantity } }
    );
  }

  // Populate order details
  const populatedOrder = await Order.findById(order._id)
    .populate('customer', 'name email phone')
    .populate('products.product', 'name description images');

  res.status(201).json(new ApiResponse(201, populatedOrder, 'Order created successfully'));
});

// Get user orders
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  const filter = { customer: userId };
  if (status) filter.status = status;

  const orders = await Order.find(filter)
    .populate('products.product', 'name description images price')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Order.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    orders,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Orders retrieved successfully'));
});

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  const order = await Order.findOne({ _id: orderId, customer: userId })
    .populate('customer', 'name email phone')
    .populate('products.product', 'name description images price')
    .populate('products.product.farmer', 'name email phone');

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  res.status(200).json(new ApiResponse(200, order, 'Order retrieved successfully'));
});

// Update order status (for farmers/admins)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status, trackingNumber, notes } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  // Validate status transition
  const validTransitions = {
    [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.PROCESSING, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.PROCESSING]: [ORDER_STATUS.SHIPPED, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.SHIPPED]: [ORDER_STATUS.DELIVERED],
    [ORDER_STATUS.DELIVERED]: [ORDER_STATUS.REFUNDED],
    [ORDER_STATUS.CANCELLED]: [],
    [ORDER_STATUS.REFUNDED]: []
  };

  if (!validTransitions[order.status]?.includes(status)) {
    throw new ApiError(400, `Cannot change status from ${order.status} to ${status}`);
  }

  // Update order
  order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (notes) order.statusNotes = notes;
  await order.save();

  res.status(200).json(new ApiResponse(200, order, 'Order status updated successfully'));
});

// Cancel order
const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  const order = await Order.findOne({ _id: orderId, customer: userId });
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  // Check if order can be cancelled
  if (![ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED].includes(order.status)) {
    throw new ApiError(400, 'Order cannot be cancelled at this stage');
  }

  // Update order status
  order.status = ORDER_STATUS.CANCELLED;
  order.cancellationReason = req.body.reason || 'Cancelled by customer';
  await order.save();

  // Restore product quantities
  for (const item of order.products) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { quantity: item.quantity } }
    );
  }

  res.status(200).json(new ApiResponse(200, order, 'Order cancelled successfully'));
});

// Get farmer orders
const getFarmerOrders = asyncHandler(async (req, res) => {
  const farmerId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  // Find orders containing products from this farmer
  const orders = await Order.find()
    .populate({
      path: 'products.product',
      match: { farmer: farmerId },
      populate: { path: 'farmer', select: 'name email' }
    })
    .populate('customer', 'name email phone')
    .sort({ createdAt: -1 });

  // Filter orders that have products from this farmer
  const farmerOrders = orders.filter(order => 
    order.products.some(item => item.product && item.product.farmer._id.toString() === farmerId)
  );

  // Apply status filter
  const filteredOrders = status 
    ? farmerOrders.filter(order => order.status === status)
    : farmerOrders;

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  res.status(200).json(new ApiResponse(200, {
    orders: paginatedOrders,
    pagination: {
      page,
      limit,
      total: filteredOrders.length,
      pages: Math.ceil(filteredOrders.length / limit)
    }
  }, 'Farmer orders retrieved successfully'));
});

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getFarmerOrders
};
