// middleware/auth.middleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  if (!token) {
    return res.status(403).json({ 
      status: "error", 
      message: "A token is required for authentication" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    
  } catch (err) {
    return res.status(401).json({ 
      status: "error", 
      message: "Invalid Token" 
    });
  }

  return next();
};

module.exports = verifyToken;