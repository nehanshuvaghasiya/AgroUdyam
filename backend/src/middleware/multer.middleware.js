const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { FILE_UPLOAD } = require('../constants');

// Ensure upload directory exists
const ensureUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    ensureUploadDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Check file type
  if (FILE_UPLOAD.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${FILE_UPLOAD.ALLOWED_FILE_TYPES.join(', ')}`), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: FILE_UPLOAD.MAX_FILE_SIZE,
    files: 10 // Maximum 10 files per request
  }
});

// Single file upload middleware
const uploadSingle = (fieldName = 'image') => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new Error('File too large'));
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return next(new Error('Too many files'));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(new Error('Unexpected field'));
          }
        }
        return next(err);
      }
      next();
    });
  };
};

// Multiple files upload middleware
const uploadMultiple = (fieldName = 'images', maxCount = 5) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new Error('File too large'));
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return next(new Error('Too many files'));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(new Error('Unexpected field'));
          }
        }
        return next(err);
      }
      next();
    });
  };
};

// Mixed fields upload middleware
const uploadFields = (fields) => {
  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new Error('File too large'));
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return next(new Error('Too many files'));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(new Error('Unexpected field'));
          }
        }
        return next(err);
      }
      next();
    });
  };
};

// Clean up uploaded files middleware
const cleanupFiles = (req, res, next) => {
  // Clean up files after response is sent
  res.on('finish', () => {
    if (req.file) {
      const filePath = req.file.path;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
  });
  
  next();
};

// Validate file size middleware
const validateFileSize = (maxSize = FILE_UPLOAD.MAX_FILE_SIZE) => {
  return (req, res, next) => {
    if (req.file && req.file.size > maxSize) {
      return next(new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`));
    }
    
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      for (const file of files) {
        if (file.size > maxSize) {
          return next(new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`));
        }
      }
    }
    
    next();
  };
};

// Validate file type middleware
const validateFileType = (allowedTypes = FILE_UPLOAD.ALLOWED_FILE_TYPES) => {
  return (req, res, next) => {
    if (req.file && !allowedTypes.includes(req.file.mimetype)) {
      return next(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
    }
    
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      for (const file of files) {
        if (!allowedTypes.includes(file.mimetype)) {
          return next(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
        }
      }
    }
    
    next();
  };
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadFields,
  cleanupFiles,
  validateFileSize,
  validateFileType,
  upload
};
