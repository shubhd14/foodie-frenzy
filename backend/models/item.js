import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

  category: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Drinks', 'Desserts']
  },

  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  hearts: { type: Number, default: 0 },
  total: { type: Number, default: 0 },

  imageUrl: { type: String },

  // 🔥 MOST IMPORTANT FIELD
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }

}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
