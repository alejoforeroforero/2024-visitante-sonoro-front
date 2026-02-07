import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const cookieToken = req.cookies?.access_token;
    if (!cookieToken) {
      return res.status(401).json({ error: 'Access token required' });
    }
    req.token = cookieToken;
  } else {
    req.token = token;
  }

  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET || 'dev-secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies?.access_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
      req.user = decoded;
    } catch (error) {
      // Token invalid, continue without user
    }
  }
  next();
};
