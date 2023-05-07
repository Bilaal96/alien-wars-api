import express from 'express';

// Controllers
import { postBattle } from '../controllers/battleController.js';

const router = express.Router();

/**
 * POST /api/battle/attack/:characterName - conduct battle between requester's character & character with 'characterName'
 */
router.post('/attack/:characterName', postBattle);

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
