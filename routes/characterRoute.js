import express from "express";
import passport from "passport";

import { createCharacter } from "../controllers/characterController.js";

const router = express.Router();

router.post("/create", createCharacter);

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
