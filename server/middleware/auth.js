import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'readora-secret-key-change-in-production';

// Middleware to verify JWT token
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token telah kadaluarsa' });
  }
};

// Middleware to check if user is admin
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang dapat mengakses' });
  }
  next();
};

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export default { authMiddleware, adminMiddleware, generateToken };
