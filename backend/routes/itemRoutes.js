import adminAuth from '../middleware/adminauth';

router.post('/', adminAuth, createItem);
