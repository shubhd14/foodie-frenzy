import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
    adminId: admin._id,
    restaurantId: admin.restaurant,
    role: 'admin'
  },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      restaurant: admin.restaurant
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
