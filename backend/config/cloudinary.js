const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for QR codes (tournament creation)
const qrStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "freefire/qrcodes", allowed_formats: ["jpg", "jpeg", "png", "webp"] },
});

// Storage for payment screenshots (player registration)
const screenshotStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "freefire/screenshots", allowed_formats: ["jpg", "jpeg", "png", "webp"] },
});

const uploadQR = multer({ storage: qrStorage });
const uploadScreenshot = multer({ storage: screenshotStorage });

module.exports = { cloudinary, uploadQR, uploadScreenshot };
