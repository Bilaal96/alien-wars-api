import express from 'express';

import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.post('/logout', logoutUser);

export default router;
