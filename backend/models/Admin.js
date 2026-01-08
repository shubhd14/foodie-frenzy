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
     restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
