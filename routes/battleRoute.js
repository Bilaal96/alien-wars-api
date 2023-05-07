import express from 'express';

// Controllers
import { getBattleLog, postBattle } from '../controllers/battleController.js';

const router = express.Router();

/**
 * POST /api/battle/attack/:characterName - conduct battle between requester's character & character with ':characterName'
 * GET /api/battle/log - get list of all battles that the requester has been a part of
 */
router.post('/attack/:characterName', postBattle);
router.get('/log', getBattleLog);

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
