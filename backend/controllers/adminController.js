import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

    // Important check
    if (admin.role !== "RESTAURANT_ADMIN") {
      return res.status(403).json({ message: "Not authorized as restaurant admin" });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        restaurantId: admin.restaurant,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      restaurantId: admin.restaurant
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
