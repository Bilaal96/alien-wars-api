import express from 'express';

import {
  getItems,
  getSingleItem,
  patchPurchaseItem,
  postPopulateShop,
} from '../controllers/shopController.js';

const router = express.Router();

// test how to insert multiple items at once
router.post('/populate', postPopulateShop);

//get items -- loads up shop items (name, stat boost, cost)
router.get('/', getItems);
router.get('/:id', getSingleItem);

router.patch('/:id/purchase/', patchPurchaseItem);

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
