import { Battle } from "../models/Battle.js";
import Character from "../models/Character.js";
import { battleRNGMaker } from "../utils/battle-utls.js";

export async function postBattle(req, res, next) {
  const { characterName } = req.params;
  const { username } = req.user;
  try {
    const defender = await Character.findOne({ characterName });
    const attacker = await Character.findOne({ username });
    const victor = battleRNGMaker(attacker, defender);
    let loser = defender;
    let spoils = 0;
    if (victor.characterName === defender.characterName) {
      spoils = attacker.gold * 0.25;
      defender.gold = defender.gold + spoils;
      attacker.gold = attacker.gold - spoils;
    } else {
      spoils = defender.gold * 0.25;
      attacker.gold = attacker.gold + spoils;
      defender.gold = defender.gold - spoils;
      loser = defender;
    }
    const attackersInfo = await Character.findOneAndUpdate(
      { characterName: attacker.characterName },
      { gold: Math.round(attacker.gold) },
      { new: true }
    );
    const defendersInfo = await Character.findOneAndUpdate(
      { characterName: defender.characterName },
      { gold: Math.round(defender.gold) },
      { new: true }
    );
    const result = await Battle.create({
      attacker: attacker.characterName,
      defender: defender.characterName,
      winner: victor.characterName,
      loser: loser.characterName,
      spoils: Math.round(spoils),
    });
    res.status(200).json({ result, attackersInfo, defendersInfo });
  } catch (err) {
    next(err);
  }
}
