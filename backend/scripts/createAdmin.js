import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Restaurant from '../models/Restaurant.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // 🔹 restaurant nikaalo
    const restaurant = await Restaurant.findOne({ slug: 'foodie-frenzy' });

    if (!restaurant) {
      console.log('❌ Restaurant not found');
      process.exit(1);
    }

    // 🔹 admin already hai?
    const existingAdmin = await Admin.findOne({ email: 'admin@foodie.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('Admin@Foodie#2026!', 10);

    const admin = new Admin({
      email: 'admin@foodie.com',
      password: hashedPassword,
      restaurant: restaurant._id // 🔥 MOST IMPORTANT
    });

    await admin.save();
    console.log('✅ Admin created successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
