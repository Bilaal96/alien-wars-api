import express from "express";
import passport from "passport";

import { createCharacter, getAllCharacters, getCharacter } from "../controllers/characterController.js";

const router = express.Router();

//patch purchase -- updates character with change in gold and attack/defence points -- change character (id) attack/defence, new equiped item & their gold

router.post("/create", createCharacter);

// load up all users on a battlefield
router.get("/", getAllCharacters);

// select a user & open up their individual
router.get("/:characterName", getCharacter)

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
