import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existing = await Admin.findOne({ email: 'superadmin@foodie.com' });

    if (existing) {
      console.log("Super Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('Super@123', 10);

    await Admin.create({
      email: 'superadmin@foodie.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN'
    });

    console.log("Super Admin Created Successfully");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createSuperAdmin();
