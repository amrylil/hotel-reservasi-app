// src/services/auth.service.js

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(userData.password, 12);

  // Buat user baru
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  // Simpan ke database
  const savedUser = await user.save();
  
  // Hapus password dari objek yang dikembalikan
  savedUser.password = undefined; 
  return savedUser;
};

// Fungsi untuk login user
const login = async (credentials) => {
  const { email, password } = credentials;

  // Cari user berdasarkan email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials'); // Pesan generik untuk keamanan
  }

  // Bandingkan password yang diinput dengan hash di database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Buat JSON Web Token (JWT)
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET, // Simpan secret key di .env!
    { expiresIn: '1h' }
  );
  
  // Hapus password dari objek user yang akan dikembalikan
  user.password = undefined;

  return { user, token };
};


module.exports = {
  register,
  login,
};