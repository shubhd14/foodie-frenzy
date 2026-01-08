import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 REAL ADMIN FETCH
    const admin = await Admin.findById(decoded.id)
      .populate('restaurant');

    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    // ✅ NOW FULL ADMIN OBJECT AVAILABLE
    req.admin = admin;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default adminAuth;
