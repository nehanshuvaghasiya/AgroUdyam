const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload single image
const uploadToCloudinary = async (filePath, folder = 'krishiconnect') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto'
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    // Delete local file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// Upload multiple images
const uploadMultipleToCloudinary = async (filePaths, folder = 'krishiconnect') => {
  try {
    const uploadPromises = filePaths.map(filePath => uploadToCloudinary(filePath, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple upload failed: ${error.message}`);
  }
};

// Delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

// Delete multiple images from Cloudinary
const deleteMultipleFromCloudinary = async (publicIds) => {
  try {
    const deletePromises = publicIds.map(publicId => deleteFromCloudinary(publicId));
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple delete failed: ${error.message}`);
  }
};

// Get optimized image URL
const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    width: 'auto',
    height: 'auto'
  };

  const finalOptions = { ...defaultOptions, ...options };
  
  return cloudinary.url(publicId, finalOptions);
};

// Generate image transformations
const generateImageTransformations = (publicId, transformations = []) => {
  return transformations.map(transform => ({
    url: cloudinary.url(publicId, transform),
    width: transform.width,
    height: transform.height,
    format: transform.format || 'auto'
  }));
};

module.exports = {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
  getOptimizedImageUrl,
  generateImageTransformations
};
