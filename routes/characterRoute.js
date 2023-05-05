import express from 'express';

// Controllers
import {
  postCharacter,
  getAllCharacters,
  getCharacter,
} from '../controllers/characterController.js';

const router = express.Router();

/**
 * POST /api/characters - create user character on account creation
 * GET /api/characters - get all characters from DB
 * GET /api/characters/single - get single character from DB 
    - NOTE: a single character is selected based on the query params provided, rather than a route param
    - This allows us to get a single character via multiple query parameters
    
    Examples
    - Route param = /api/characters/:id
    - Query params
      - /api/characters/single?username=billy
      - /api/characters/single?characterName=bob
      - /api/characters/single?username=billy&characterName=bob
 */
router.post('/', postCharacter);
router.get('/', getAllCharacters);
router.get('/single', getCharacter);

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
