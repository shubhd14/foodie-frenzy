import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Restaurant from "../models/Restaurant.js";
import Admin from "../models/Admin.js";

export const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (admin.role !== "SUPER_ADMIN") {
      return res.status(403).json({ message: "Not a super admin" });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        role: "SUPER_ADMIN"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Super Admin Login Success",
      token
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createRestaurantWithAdmin = async (req, res) => {
  try {
    const {
      restaurantName,
      slug,
      themeColor,
      adminName,
      adminEmail
    } = req.body;

    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const existing = await Restaurant.findOne({ slug });

    if (existing) {
      return res.status(400).json({ message: "Restaurant with this slug already exists" });
    }

    const restaurant = await Restaurant.create({
      name: restaurantName,
      slug,
      themeColor
    });

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await Admin.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "RESTAURANT_ADMIN",
      restaurant: restaurant._id
    });

    return res.status(201).json({
      message: "Restaurant & Admin created",
      tempPassword
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
