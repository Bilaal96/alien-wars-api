import express from 'express';

// Controllers
import { getBattles, postBattle } from '../controllers/battleController.js';

const router = express.Router();

/**
 * POST /api/battle/attack/:characterName - conduct battle between requester's character & character with 'characterName'
 * GET /api/battle/battle-log - get all battles that the requester has been a part of
 */
router.post('/attack/:characterName', postBattle);
router.get('/battle-log', getBattles);

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
