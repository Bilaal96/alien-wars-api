import express from "express";
import { postBattle, getBattles } from "../controllers/battleController.js";
// import { postBattle } from "../controllers/battleController.js";

const router = express.Router();

//post sends back the information (battle log)
router.post("/:characterName/attack", postBattle);
router.get("/battle-log", getBattles)

router.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} - ${err.message}`);
    return res.status(403).json({ err });
  }
});

export default router;
