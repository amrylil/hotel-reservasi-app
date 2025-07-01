
const express = require('express');
const { registerHandler, loginHandler } = require('../controllers/auth.controller');
const { validate, registerSchema, loginSchema } = require('../dtos/auth.dto');

const router = express.Router();

router.post('/register', validate(registerSchema), registerHandler);
router.post('/login', validate(loginSchema), loginHandler);

module.exports = router;