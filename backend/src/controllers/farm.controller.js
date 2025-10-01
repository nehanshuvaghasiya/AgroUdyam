const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const Farm = require('../models/farm.model');
const Role = require('../models/role.model');
const { sendEmail } = require('../integrations/nodemailer.service');
const { EMAIL_TEMPLATES, USER_ROLES } = require('../constants');

// Create farm
const createFarm = asyncHandler(async (req, res) => {
  const { name, description, location, contactInfo } = req.body;
  const ownerId = req.user.id;

  // Check if user already has a farm
  const existingFarm = await Farm.findOne({ owner: ownerId });
  if (existingFarm) {
    throw new ApiError(400, 'User already owns a farm');
  }

  const farm = await Farm.create({
    name,
    description,
    location,
    contactInfo,
    owner: ownerId
  });

  // Update user's farm reference
  await User.findByIdAndUpdate(ownerId, { farm: farm._id });

  res.status(201).json(new ApiResponse(201, farm, 'Farm created successfully'));
});

// Get farm details
const getFarmDetails = asyncHandler(async (req, res) => {
  const farmId = req.params.farmId || req.user.farm;

  const farm = await Farm.findById(farmId)
    .populate('owner', 'name email phone')
    .populate('staff', 'name email phone role');

  if (!farm) {
    throw new ApiError(404, 'Farm not found');
  }

  res.status(200).json(new ApiResponse(200, farm, 'Farm details retrieved successfully'));
});

// Update farm details
const updateFarmDetails = asyncHandler(async (req, res) => {
  const farmId = req.params.farmId || req.user.farm;
  const { name, description, location, contactInfo } = req.body;

  const farm = await Farm.findByIdAndUpdate(
    farmId,
    { name, description, location, contactInfo },
    { new: true, runValidators: true }
  );

  if (!farm) {
    throw new ApiError(404, 'Farm not found');
  }

  res.status(200).json(new ApiResponse(200, farm, 'Farm updated successfully'));
});

// Invite staff to farm
const inviteStaff = asyncHandler(async (req, res) => {
  const { email, role, message } = req.body;
  const farmId = req.user.farm;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Get role details
  const roleDetails = await Role.findOne({ name: role });
  if (!roleDetails) {
    throw new ApiError(400, 'Invalid role specified');
  }

  // Generate invitation token (you might want to create an invitation model)
  const invitationToken = require('crypto').randomBytes(32).toString('hex');
  
  // Send invitation email
  try {
    await sendEmail({
      to: email,
      subject: 'Invitation to join farm on AgroUdyam',
      template: EMAIL_TEMPLATES.STAFF_INVITATION,
      data: {
        email,
        role: roleDetails.name,
        message,
        invitationToken,
        farmName: req.user.farm?.name || 'Our Farm'
      }
    });
  } catch (error) {
    throw new ApiError(500, 'Failed to send invitation email');
  }

  res.status(200).json(new ApiResponse(200, null, 'Staff invitation sent successfully'));
});

// Get farm staff
const getFarmStaff = asyncHandler(async (req, res) => {
  const farmId = req.params.farmId || req.user.farm;

  const staff = await User.find({ farm: farmId })
    .populate('role', 'name permissions')
    .select('-password')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, staff, 'Farm staff retrieved successfully'));
});

// Update staff role
const updateStaffRole = asyncHandler(async (req, res) => {
  const { staffId } = req.params;
  const { roleId } = req.body;
  const farmId = req.user.farm;

  // Check if staff member belongs to the farm
  const staff = await User.findOne({ _id: staffId, farm: farmId });
  if (!staff) {
    throw new ApiError(404, 'Staff member not found in your farm');
  }

  // Update role
  staff.role = roleId;
  await staff.save();

  res.status(200).json(new ApiResponse(200, staff, 'Staff role updated successfully'));
});

// Remove staff from farm
const removeStaff = asyncHandler(async (req, res) => {
  const { staffId } = req.params;
  const farmId = req.user.farm;

  // Check if staff member belongs to the farm
  const staff = await User.findOne({ _id: staffId, farm: farmId });
  if (!staff) {
    throw new ApiError(404, 'Staff member not found in your farm');
  }

  // Remove farm reference and change role to customer
  const customerRole = await Role.findOne({ name: USER_ROLES.CUSTOMER });
  staff.farm = undefined;
  staff.role = customerRole._id;
  await staff.save();

  res.status(200).json(new ApiResponse(200, null, 'Staff member removed successfully'));
});

// Accept farm invitation
const acceptInvitation = asyncHandler(async (req, res) => {
  const { invitationToken, password } = req.body;
  const { email, role, farmId } = req.body; // These would come from the invitation

  // Verify invitation token and get invitation details
  // In a real implementation, you'd have an invitation model
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Hash password
  const hashedPassword = await require('bcryptjs').hash(password, 12);

  // Get role
  const roleDetails = await Role.findOne({ name: role });
  if (!roleDetails) {
    throw new ApiError(400, 'Invalid role');
  }

  // Create user
  const user = await User.create({
    name: req.body.name,
    email,
    password: hashedPassword,
    phone: req.body.phone,
    role: roleDetails._id,
    farm: farmId
  });

  res.status(201).json(new ApiResponse(201, user, 'Invitation accepted successfully'));
});

module.exports = {
  createFarm,
  getFarmDetails,
  updateFarmDetails,
  inviteStaff,
  getFarmStaff,
  updateStaffRole,
  removeStaff,
  acceptInvitation
};
