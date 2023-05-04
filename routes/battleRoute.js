import express from "express";
import { getAllCharacters, getCharacter } from "../controllers/characterController.js";
import { postTestBattle } from "../controllers/battleController.js";
// import { postBattle } from "../controllers/battleController.js";

const router = express.Router();



//post sends back the information (battle log)
router.post("/:characterName/attack", postTestBattle)

// battle now (their stats & gold)
// what is my attack? do an rng on it (100 -> 85 - 115)
// what is enemies defence? do an rng on it (100 -> 85 - 115)
// compare finalised attack against their defence, if higher, win
// if won, you win 80% of their holding gold, if loss, 
// ((NOT MVP)) you lose, either way you lose your stored attack turns, 10 turns an hour, one fight costs 20 turns
// store this battle like we did we comments on nc news


// get all users

// get a single user --> get all battles 

// post a battle (both users id's/names) --> patch to both users, gained gold/lost gold



router.use((err, req, res, next) => {
    if (err) {
        console.error(`${err.name} - ${err.message}`);
        return res.status(403).json({ err });
    }
});

export default router;
