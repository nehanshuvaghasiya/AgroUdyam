const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Payout = require('../models/payout.model');
const Wallet = require('../models/wallet.model');
const Order = require('../models/order.model');
const { PAYOUT_STATUS, USER_ROLES } = require('../constants');

// Request payout
const requestPayout = asyncHandler(async (req, res) => {
  const { amount, bankDetails, notes } = req.body;
  const farmerId = req.user.id;

  // Check if user has sufficient balance
  const wallet = await Wallet.findOne({ user: farmerId });
  if (!wallet) {
    throw new ApiError(404, 'Wallet not found');
  }

  if (wallet.balance < amount) {
    throw new ApiError(400, 'Insufficient balance for payout');
  }

  // Check minimum payout amount
  const minPayoutAmount = 100; // This should come from system settings
  if (amount < minPayoutAmount) {
    throw new ApiError(400, `Minimum payout amount is ${minPayoutAmount}`);
  }

  // Create payout request
  const payout = await Payout.create({
    farmer: farmerId,
    amount,
    bankDetails,
    notes,
    status: PAYOUT_STATUS.PENDING
  });

  res.status(201).json(new ApiResponse(201, payout, 'Payout request submitted successfully'));
});

// Get farmer payout requests
const getFarmerPayouts = asyncHandler(async (req, res) => {
  const farmerId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  const filter = { farmer: farmerId };
  if (status) filter.status = status;

  const payouts = await Payout.find(filter)
    .populate('farmer', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Payout.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    payouts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Payout requests retrieved successfully'));
});

// Get payout by ID
const getPayoutById = asyncHandler(async (req, res) => {
  const { payoutId } = req.params;
  const userId = req.user.id;

  const payout = await Payout.findOne({ _id: payoutId, farmer: userId })
    .populate('farmer', 'name email phone');

  if (!payout) {
    throw new ApiError(404, 'Payout request not found');
  }

  res.status(200).json(new ApiResponse(200, payout, 'Payout request retrieved successfully'));
});

// Get all payout requests (admin only)
const getAllPayouts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  const filter = {};
  if (status) filter.status = status;

  const payouts = await Payout.find(filter)
    .populate('farmer', 'name email phone')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Payout.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    payouts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'All payout requests retrieved successfully'));
});

// Approve payout request (admin only)
const approvePayout = asyncHandler(async (req, res) => {
  const { payoutId } = req.params;
  const { notes } = req.body;

  const payout = await Payout.findById(payoutId);
  if (!payout) {
    throw new ApiError(404, 'Payout request not found');
  }

  if (payout.status !== PAYOUT_STATUS.PENDING) {
    throw new ApiError(400, 'Payout request is not pending');
  }

  // Update payout status
  payout.status = PAYOUT_STATUS.APPROVED;
  payout.approvedBy = req.user.id;
  payout.approvedAt = new Date();
  payout.adminNotes = notes;
  await payout.save();

  // Deduct amount from wallet
  await Wallet.findOneAndUpdate(
    { user: payout.farmer },
    { $inc: { balance: -payout.amount } }
  );

  res.status(200).json(new ApiResponse(200, payout, 'Payout request approved successfully'));
});

// Reject payout request (admin only)
const rejectPayout = asyncHandler(async (req, res) => {
  const { payoutId } = req.params;
  const { reason } = req.body;

  const payout = await Payout.findById(payoutId);
  if (!payout) {
    throw new ApiError(404, 'Payout request not found');
  }

  if (payout.status !== PAYOUT_STATUS.PENDING) {
    throw new ApiError(400, 'Payout request is not pending');
  }

  // Update payout status
  payout.status = PAYOUT_STATUS.REJECTED;
  payout.rejectedBy = req.user.id;
  payout.rejectedAt = new Date();
  payout.rejectionReason = reason;
  await payout.save();

  res.status(200).json(new ApiResponse(200, payout, 'Payout request rejected successfully'));
});

// Process payout (admin only)
const processPayout = asyncHandler(async (req, res) => {
  const { payoutId } = req.params;
  const { transactionId, notes } = req.body;

  const payout = await Payout.findById(payoutId);
  if (!payout) {
    throw new ApiError(404, 'Payout request not found');
  }

  if (payout.status !== PAYOUT_STATUS.APPROVED) {
    throw new ApiError(400, 'Payout request must be approved before processing');
  }

  // Update payout status
  payout.status = PAYOUT_STATUS.PROCESSED;
  payout.processedBy = req.user.id;
  payout.processedAt = new Date();
  payout.transactionId = transactionId;
  payout.processNotes = notes;
  await payout.save();

  res.status(200).json(new ApiResponse(200, payout, 'Payout processed successfully'));
});

// Calculate farmer earnings
const calculateEarnings = asyncHandler(async (req, res) => {
  const farmerId = req.user.id;

  // Get completed orders for this farmer
  const orders = await Order.find({ status: 'delivered' })
    .populate({
      path: 'products.product',
      match: { farmer: farmerId }
    });

  let totalEarnings = 0;
  let totalOrders = 0;

  orders.forEach(order => {
    order.products.forEach(item => {
      if (item.product && item.product.farmer.toString() === farmerId) {
        totalEarnings += item.total;
        totalOrders += 1;
      }
    });
  });

  // Get wallet balance
  const wallet = await Wallet.findOne({ user: farmerId });
  const currentBalance = wallet ? wallet.balance : 0;

  // Get pending payouts
  const pendingPayouts = await Payout.find({
    farmer: farmerId,
    status: PAYOUT_STATUS.PENDING
  });

  const pendingAmount = pendingPayouts.reduce((sum, payout) => sum + payout.amount, 0);

  res.status(200).json(new ApiResponse(200, {
    totalEarnings,
    totalOrders,
    currentBalance,
    pendingAmount,
    availableForPayout: currentBalance - pendingAmount
  }, 'Earnings calculated successfully'));
});

module.exports = {
  requestPayout,
  getFarmerPayouts,
  getPayoutById,
  getAllPayouts,
  approvePayout,
  rejectPayout,
  processPayout,
  calculateEarnings
};
