const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Wallet = require('../models/wallet.model');
const Transaction = require('../models/wallet.model'); // Assuming transactions are stored in wallet model
const Order = require('../models/order.model');

// Get wallet balance
const getWalletBalance = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  let wallet = await Wallet.findOne({ user: userId });
  
  if (!wallet) {
    // Create wallet if it doesn't exist
    wallet = await Wallet.create({
      user: userId,
      balance: 0
    });
  }

  res.status(200).json(new ApiResponse(200, {
    balance: wallet.balance,
    currency: 'INR'
  }, 'Wallet balance retrieved successfully'));
});

// Get wallet transactions
const getWalletTransactions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const type = req.query.type; // 'credit' or 'debit'

  const filter = { user: userId };
  if (type) filter.type = type;

  const transactions = await Transaction.find(filter)
    .populate('order', 'orderNumber totalAmount status')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Transaction.countDocuments(filter);

  res.status(200).json(new ApiResponse(200, {
    transactions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, 'Wallet transactions retrieved successfully'));
});

// Add money to wallet (for testing purposes)
const addMoneyToWallet = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { amount, paymentMethod } = req.body;

  if (amount <= 0) {
    throw new ApiError(400, 'Amount must be greater than 0');
  }

  // Find or create wallet
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({
      user: userId,
      balance: 0
    });
  }

  // Add money to wallet
  wallet.balance += amount;
  await wallet.save();

  // Create transaction record
  const transaction = await Transaction.create({
    user: userId,
    type: 'credit',
    amount,
    description: 'Wallet top-up',
    paymentMethod,
    status: 'completed'
  });

  res.status(200).json(new ApiResponse(200, {
    newBalance: wallet.balance,
    transaction
  }, 'Money added to wallet successfully'));
});

// Get wallet summary
const getWalletSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Get wallet balance
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({
      user: userId,
      balance: 0
    });
  }

  // Get transaction summary
  const transactionSummary = await Transaction.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: '$type',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    }
  ]);

  // Get pending payouts
  const Payout = require('../models/payout.model');
  const pendingPayouts = await Payout.find({
    farmer: userId,
    status: 'pending'
  });

  const pendingAmount = pendingPayouts.reduce((sum, payout) => sum + payout.amount, 0);

  // Get recent transactions
  const recentTransactions = await Transaction.find({ user: userId })
    .populate('order', 'orderNumber totalAmount')
    .sort({ createdAt: -1 })
    .limit(5);

  const summary = {
    currentBalance: wallet.balance,
    availableBalance: wallet.balance - pendingAmount,
    pendingAmount,
    transactionSummary: transactionSummary.reduce((acc, item) => {
      acc[item._id] = {
        totalAmount: item.totalAmount,
        count: item.count
      };
      return acc;
    }, {}),
    recentTransactions
  };

  res.status(200).json(new ApiResponse(200, summary, 'Wallet summary retrieved successfully'));
});

// Transfer money between users (internal transfer)
const transferMoney = asyncHandler(async (req, res) => {
  const { recipientId, amount, description } = req.body;
  const senderId = req.user.id;

  if (amount <= 0) {
    throw new ApiError(400, 'Amount must be greater than 0');
  }

  if (senderId === recipientId) {
    throw new ApiError(400, 'Cannot transfer money to yourself');
  }

  // Check if recipient exists
  const recipient = await require('../models/user.model').findById(recipientId);
  if (!recipient) {
    throw new ApiError(404, 'Recipient not found');
  }

  // Get sender wallet
  let senderWallet = await Wallet.findOne({ user: senderId });
  if (!senderWallet) {
    senderWallet = await Wallet.create({ user: senderId, balance: 0 });
  }

  // Check if sender has sufficient balance
  if (senderWallet.balance < amount) {
    throw new ApiError(400, 'Insufficient balance');
  }

  // Get or create recipient wallet
  let recipientWallet = await Wallet.findOne({ user: recipientId });
  if (!recipientWallet) {
    recipientWallet = await Wallet.create({ user: recipientId, balance: 0 });
  }

  // Perform transfer
  senderWallet.balance -= amount;
  recipientWallet.balance += amount;

  await senderWallet.save();
  await recipientWallet.save();

  // Create transaction records
  const debitTransaction = await Transaction.create({
    user: senderId,
    type: 'debit',
    amount,
    description: `Transfer to ${recipient.name}: ${description || 'Internal transfer'}`,
    status: 'completed'
  });

  const creditTransaction = await Transaction.create({
    user: recipientId,
    type: 'credit',
    amount,
    description: `Transfer from ${req.user.name}: ${description || 'Internal transfer'}`,
    status: 'completed'
  });

  res.status(200).json(new ApiResponse(200, {
    newBalance: senderWallet.balance,
    transaction: debitTransaction
  }, 'Money transferred successfully'));
});

// Get wallet analytics
const getWalletAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { period = '30' } = req.query; // days

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(period));

  // Get transaction analytics
  const analytics = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          type: '$type',
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.month': 1, '_id.day': 1 }
    }
  ]);

  // Get monthly summary
  const monthlySummary = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' }
        },
        totalCredit: {
          $sum: {
            $cond: [{ $eq: ['$type', 'credit'] }, '$amount', 0]
          }
        },
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ['$type', 'debit'] }, '$amount', 0]
          }
        },
        transactionCount: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);

  res.status(200).json(new ApiResponse(200, {
    analytics,
    monthlySummary
  }, 'Wallet analytics retrieved successfully'));
});

module.exports = {
  getWalletBalance,
  getWalletTransactions,
  addMoneyToWallet,
  getWalletSummary,
  transferMoney,
  getWalletAnalytics
};
