const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Konfigurasi Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Konfigurasi penyimpanan Cloudinary untuk Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hotel-rooms', // Nama folder di Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  }
});

// Export instance Multer yang sudah dikonfigurasi
module.exports = multer({ storage: storage });