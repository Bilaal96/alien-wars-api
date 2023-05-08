import express from 'express';

// Controllers
import {
  getShopItems,
  getShopItemById,
  postPopulateShopWithItems,
  patchPurchaseShopItem,
} from '../controllers/shopController.js';

const router = express.Router();

/**
 * POST /api/shop/populate - repopulates the shop collection with shopData array (defined in /db/data/dev-data/items.js)
 * GET /api/shop 
  - retrieves all items from the shop
  - or filters items by type when itemType query param is provided
    - /api/shop?itemType=weapon - get all items where item.type === "weapon"
    - /api/shop?itemType=armour - get all items where item.type === "armour"
 * GET /api/shop/:itemId - retrieves a single item from the shop
 * PATCH /api/shop/:itemId/purchase - purchase an item - updates character stats of the user according to item purchased
 */
router.post('/populate', postPopulateShopWithItems);
router.get('/', getShopItems);
router.get('/:itemId', getShopItemById);
router.patch('/:itemId/purchase', patchPurchaseShopItem);

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
