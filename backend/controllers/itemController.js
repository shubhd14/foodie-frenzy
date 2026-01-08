import Item from '../models/item.js';

/**
 * CREATE ITEM (ADMIN ONLY)
 */
export const createItem = async (req, res, next) => {
  try {
    const { name, description, category, price, rating, hearts } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    // 🔥 restaurantId TOKEN se aayega (secure)
    const restaurantId = req.admin.restaurant;

    const total = Number(price) * 1;

    const newItem = new Item({
      name,
      description,
      category,
      price,
      rating,
      hearts,
      imageUrl,
      total,
      restaurant: restaurantId, // ✅ VERY IMPORTANT
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);

  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Item name already exists' });
    } else {
      next(err);
    }
  }
};


/**
 * GET ITEMS (RESTAURANT WISE)
 */
export const getItems = async (req, res, next) => {
  try {
    const restaurantId = req.admin.restaurant;

    const items = await Item.find({ restaurant: restaurantId })
      .sort({ createdAt: -1 });

    const host = `${req.protocol}://${req.get('host')}`;

    const withFullUrl = items.map(item => ({
      ...item.toObject(),
      imageUrl: item.imageUrl ? host + item.imageUrl : '',
    }));

    res.json(withFullUrl);

  } catch (err) {
    next(err);
  }
};


/**
 * DELETE ITEM (ONLY OWN RESTAURANT)
 */
export const deleteItem = async (req, res, next) => {
  try {
    const restaurantId = req.admin.restaurant;

    const removed = await Item.findOneAndDelete({
      _id: req.params.id,
      restaurant: restaurantId
    });

    if (!removed) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
