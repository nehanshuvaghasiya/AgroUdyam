const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
const createPaymentIntent = async (amount, currency = 'inr', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment intent creation failed: ${error.message}`);
  }
};

// Confirm payment intent
const confirmPaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment confirmation failed: ${error.message}`);
  }
};

// Create customer
const createCustomer = async (email, name, phone) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
    });

    return customer;
  } catch (error) {
    throw new Error(`Customer creation failed: ${error.message}`);
  }
};

// Get customer
const getCustomer = async (customerId) => {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
  } catch (error) {
    throw new Error(`Customer retrieval failed: ${error.message}`);
  }
};

// Update customer
const updateCustomer = async (customerId, updateData) => {
  try {
    const customer = await stripe.customers.update(customerId, updateData);
    return customer;
  } catch (error) {
    throw new Error(`Customer update failed: ${error.message}`);
  }
};

// Create payment method
const createPaymentMethod = async (type, cardDetails) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type,
      card: cardDetails,
    });

    return paymentMethod;
  } catch (error) {
    throw new Error(`Payment method creation failed: ${error.message}`);
  }
};

// Attach payment method to customer
const attachPaymentMethod = async (paymentMethodId, customerId) => {
  try {
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    return paymentMethod;
  } catch (error) {
    throw new Error(`Payment method attachment failed: ${error.message}`);
  }
};

// Create refund
const createRefund = async (paymentIntentId, amount, reason = 'requested_by_customer') => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: Math.round(amount * 100), // Convert to cents
      reason,
    });

    return refund;
  } catch (error) {
    throw new Error(`Refund creation failed: ${error.message}`);
  }
};

// Get refund
const getRefund = async (refundId) => {
  try {
    const refund = await stripe.refunds.retrieve(refundId);
    return refund;
  } catch (error) {
    throw new Error(`Refund retrieval failed: ${error.message}`);
  }
};

// List refunds
const listRefunds = async (limit = 10) => {
  try {
    const refunds = await stripe.refunds.list({
      limit,
    });

    return refunds;
  } catch (error) {
    throw new Error(`Refunds listing failed: ${error.message}`);
  }
};

// Create transfer (for payouts to farmers)
const createTransfer = async (amount, destination, metadata = {}) => {
  try {
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'inr',
      destination,
      metadata,
    });

    return transfer;
  } catch (error) {
    throw new Error(`Transfer creation failed: ${error.message}`);
  }
};

// Create connected account (for farmers)
const createConnectedAccount = async (email, country = 'IN', type = 'express') => {
  try {
    const account = await stripe.accounts.create({
      type,
      country,
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    return account;
  } catch (error) {
    throw new Error(`Connected account creation failed: ${error.message}`);
  }
};

// Create account link (for onboarding)
const createAccountLink = async (accountId, refreshUrl, returnUrl) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });

    return accountLink;
  } catch (error) {
    throw new Error(`Account link creation failed: ${error.message}`);
  }
};

// Get account
const getAccount = async (accountId) => {
  try {
    const account = await stripe.accounts.retrieve(accountId);
    return account;
  } catch (error) {
    throw new Error(`Account retrieval failed: ${error.message}`);
  }
};

// Create webhook endpoint
const createWebhookEndpoint = async (url, events) => {
  try {
    const endpoint = await stripe.webhookEndpoints.create({
      url,
      enabled_events: events,
    });

    return endpoint;
  } catch (error) {
    throw new Error(`Webhook endpoint creation failed: ${error.message}`);
  }
};

// Verify webhook signature
const verifyWebhookSignature = (payload, signature, secret) => {
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, secret);
    return event;
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
};

// Get payment methods for customer
const getCustomerPaymentMethods = async (customerId, type = 'card') => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type,
    });

    return paymentMethods;
  } catch (error) {
    throw new Error(`Payment methods retrieval failed: ${error.message}`);
  }
};

// Delete payment method
const deletePaymentMethod = async (paymentMethodId) => {
  try {
    const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId);
    return paymentMethod;
  } catch (error) {
    throw new Error(`Payment method deletion failed: ${error.message}`);
  }
};

// Calculate platform fee
const calculatePlatformFee = (amount, feePercentage = 5) => {
  return Math.round((amount * feePercentage) / 100);
};

// Calculate farmer payout
const calculateFarmerPayout = (amount, platformFeePercentage = 5) => {
  const platformFee = calculatePlatformFee(amount, platformFeePercentage);
  return amount - platformFee;
};

module.exports = {
  createPaymentIntent,
  confirmPaymentIntent,
  createCustomer,
  getCustomer,
  updateCustomer,
  createPaymentMethod,
  attachPaymentMethod,
  createRefund,
  getRefund,
  listRefunds,
  createTransfer,
  createConnectedAccount,
  createAccountLink,
  getAccount,
  createWebhookEndpoint,
  verifyWebhookSignature,
  getCustomerPaymentMethods,
  deletePaymentMethod,
  calculatePlatformFee,
  calculateFarmerPayout
};
