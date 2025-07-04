
const express = require('express');
const { registerHandler, loginHandler } = require('../controllers/auth.controller');
const { validate, registerSchema, loginSchema } = require('../dtos/auth.dto');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', validate(registerSchema), registerHandler);
router.post('/login', validate(loginSchema), loginHandler);

router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
  res.json({ message: 'Logged out' });
});


module.exports = router;