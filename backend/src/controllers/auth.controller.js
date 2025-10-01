const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const { generateToken, generateRefreshToken } = require('../utils/jwt.utils');
const { sendEmail } = require('../integrations/nodemailer.service');
const { EMAIL_TEMPLATES } = require('../constants');
const bcrypt = require('bcryptjs');

// Register new user
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, farmName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Get default role if not specified
  let userRole;
  if (role) {
    userRole = await Role.findOne({ name: role });
  } else {
    userRole = await Role.findOne({ name: 'customer' });
  }

  if (!userRole) {
    throw new ApiError(400, 'Invalid role specified');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role: userRole._id,
    farmName
  });

  // Generate tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Send welcome email
  try {
    await sendEmail({
      to: user.email,
      subject: 'Welcome to AgroUdyam!',
      template: EMAIL_TEMPLATES.WELCOME,
      data: { name: user.name }
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(201).json(new ApiResponse(201, {
    success: true,
    user: userResponse,
    token,
    refreshToken
  }, 'User registered successfully'));
});

// Login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("email",email);
  console.log("password",password);
  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password').populate('role', 'name permissions');
  
  // if (!user || !(await user.correctPassword(password, user.password))) {
  //   throw new ApiError(401, 'Invalid email or password');
  // }

  // // Check if user is active
  // if (!user.isActive) {
  //   throw new ApiError(401, 'Your account has been suspended. Please contact support.');
  // }

  // Generate tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json(new ApiResponse(200, {
    success: true,
    user: userResponse,
    token,
    refreshToken
  }, 'Login successful'));
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  // In a more sophisticated implementation, you might want to blacklist the token
  // For now, we'll just send a success response
    res.status(200).json(new ApiResponse(200, {
    success: true,
    message: 'Logout successful'
  }, 'Logout successful'));
});

// Refresh token
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  // Verify refresh token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  
  // Check if user still exists
  const user = await User.findById(decoded.id).populate('role', 'name permissions');
  if (!user) {
    throw new ApiError(401, 'User not found');
  }

  // Generate new tokens
  const newToken = generateToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  res.status(200).json(new ApiResponse(200, {
    success: true,
    token: newToken,
    refreshToken: newRefreshToken
  }, 'Token refreshed successfully'));
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User with this email does not exist');
  }

  // Generate reset token
  const resetToken = generateToken(user._id, '1h');
  
  // Save reset token to user (you might want to add a resetToken field to user model)
  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  // Send reset email
  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      template: EMAIL_TEMPLATES.PASSWORD_RESET,
      data: { 
        name: user.name,
        resetToken 
      }
    });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    throw new ApiError(500, 'There was an error sending the email. Try again later.');
  }

  res.status(200).json(new ApiResponse(200, {
    success: true,
    message: 'Password reset email sent'
  }, 'Password reset email sent'));
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const user = await User.findOne({
    _id: decoded.id,
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new ApiError(400, 'Token is invalid or has expired');
  }

  // Update password
  user.password = await bcrypt.hash(password, 12);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.status(200).json(new ApiResponse(200, {
    success: true,
    message: 'Password reset successful'
  }, 'Password reset successful'));
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId).select('+password');
  
  // Check current password
  if (!(await user.correctPassword(currentPassword, user.password))) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  // Update password
  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();

  res.status(200).json(new ApiResponse(200, {
    success: true,
    message: 'Password changed successfully'
  }, 'Password changed successfully'));
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword
};
