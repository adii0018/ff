// Local disk storage — no Cloudinary needed for local dev
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload dirs exist
["uploads/qrcodes", "uploads/screenshots"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, `uploads/${folder}`),
    filename: (req, file, cb) =>
      cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
  });

const uploadQR = multer({ storage: storage("qrcodes") });
const uploadScreenshot = multer({ storage: storage("screenshots") });

module.exports = { uploadQR, uploadScreenshot };
