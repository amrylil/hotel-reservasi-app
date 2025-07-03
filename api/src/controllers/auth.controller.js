const authService = require('../services/auth.service');

const registerHandler = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const loginHandler = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);

     res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', 
      maxAge: 24 * 60 * 60 * 1000 
    });
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user,
        accessToken: token,
      },
    });
  } catch (error) {
    // Jika service melempar error (misal: kredensial salah), teruskan
    res.status(401).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};