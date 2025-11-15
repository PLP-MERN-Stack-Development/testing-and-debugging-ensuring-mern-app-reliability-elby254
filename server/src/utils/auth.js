// utils/auth.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '1h' }
  );
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { generateToken, verifyToken };

