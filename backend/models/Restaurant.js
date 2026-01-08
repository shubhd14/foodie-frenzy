import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    logo: {
      type: String
    },

    themeColor: {
      type: String,
      default: '#ff4d4d'
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
