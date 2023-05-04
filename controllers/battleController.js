import { Battle } from '../models/Battle.js';
import { getCharacter } from './characterController.js';
import Character from '../models/Character.js';
import { battleRNGMaker } from '../utils/battle-utls.js';

// export async function postBattle(req, res, next) {
//     try {
//         const shopItems = await Character.find();
//         res.status(200).send({ shopItems });
//     } catch (err) {
//         next(err);
//     }
// }


export async function postTestBattle(req, res, next) {
    const { characterName } = req.params

    const { username } = req.user



    try {
        const defender = await Character.findOne({ characterName })
        const attacker = await Character.findOne({ username })
        const victor = battleRNGMaker(attacker, defender)
        if (victor.characterName === defender.characterName) {
            defender.gold += attacker.gold
            attacker.gold = 0

        } else {
            attacker.gold += defender.gold
            defender.gold = 0;
        }

        const attackersInfo = await Character.findOneAndUpdate({ characterName: attacker.characterName }, { gold: attacker.gold })
        const defendersInfo = await Character.findOneAndUpdate({ characterName: defender.characterName }, { gold: defender.gold })

        // const testBattle = [
        //     {
        //         attacker: attacker.characterName,
        //         defender: defender.characterName,
        //         winner: victor.characterName,
        //         winnersGold: victor.gold,
        //     }
        // ]
        const result = await Battle.create({
            attacker: attacker.characterName,
            defender: defender.characterName,
            winner: victor.characterName,
            spoils: victor.gold,
        });
        res.status(200).json({ result, attackersInfo, defendersInfo });
    } catch (err) {
        next(err)
    }
}