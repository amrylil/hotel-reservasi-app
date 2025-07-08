const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  savedUser.password = undefined;
  return savedUser;
};

const login = async (credentials) => {
  const { email, password } = credentials;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  user.password = undefined;
  return { user, token };
};

module.exports = {
  register,
  login,
};
