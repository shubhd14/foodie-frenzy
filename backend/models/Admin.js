import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
     role: { type: String, enum: ["SUPER_ADMIN", "RESTAURANT_ADMIN"] },
     restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
