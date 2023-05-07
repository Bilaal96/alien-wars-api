// Models
import Battle from '../models/Battle.js';
import Character from '../models/Character.js';

// Utils
import conductBattle from '../utils/conduct-battle.js';

export async function postBattle(req, res, next) {
  const { characterName } = req.params;
  const { username } = req.user;

  try {
    const attacker = await Character.findOne({ username });
    const defender = await Character.findOne({ characterName });

    const { winner, loser } = conductBattle(attacker, defender);

    let spoils = 0;
    const SPOILS_MULTIPLIER = 0.25; // % of gold taken as spoils

    if (winner.characterName === attacker.characterName) {
      // Attacker won; attacker takes gold from defender
      spoils = Math.round(defender.gold * SPOILS_MULTIPLIER);
      attacker.gold = attacker.gold + spoils;
      defender.gold = defender.gold - spoils;
    } else {
      // Defender won; defender takes gold from attacker
      spoils = Math.round(attacker.gold * SPOILS_MULTIPLIER);
      defender.gold = defender.gold + spoils;
      attacker.gold = attacker.gold - spoils;
    }

    // Update participants' gold
    const attackersInfo = await Character.findOneAndUpdate(
      { characterName: attacker.characterName },
      { gold: attacker.gold },
      { new: true }
    );
    const defendersInfo = await Character.findOneAndUpdate(
      { characterName: defender.characterName },
      { gold: defender.gold },
      { new: true }
    );

    // Create battle report - i.e. a summary of the battle results
    const battleReport = await Battle.create({
      attacker: attacker.characterName,
      defender: defender.characterName,
      winner: winner.characterName,
      loser: loser.characterName,
      spoils: spoils,
    });

    res.status(200).json({ battleReport, attackersInfo, defendersInfo });
  } catch (err) {
    next(err);
  }
}
