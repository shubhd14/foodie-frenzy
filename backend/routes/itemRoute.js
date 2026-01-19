//itemRoute.js
import express from 'express';
import multer from 'multer';
import { createItem, getItems, deleteItem } from '../controllers/itemController.js';
import adminAuth from '../middleware/adminauth.js';

const itemRouter = express.Router();
itemRouter.use((req, res, next) => {
  console.log("ITEM ROUTER HIT:", req.method, req.originalUrl);
  next();
});

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

itemRouter.post('/', adminAuth, upload.single('image'), createItem);
itemRouter.get('/', adminAuth, getItems);
itemRouter.delete('/:id', adminAuth, deleteItem);

export default itemRouter;