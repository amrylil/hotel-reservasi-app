const express = require('express');
const {
  registerHandler,
  loginHandler,
} = require('../controllers/auth.controller');
const { validate, registerSchema, loginSchema } = require('../dtos/auth.dto');
const verifyToken = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', validate(registerSchema), registerHandler);
router.post('/login', validate(loginSchema), loginHandler);

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out' });
});

module.exports = router;
