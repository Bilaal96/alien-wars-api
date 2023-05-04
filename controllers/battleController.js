import { Battle } from '../models/Battle.js';
import { getCharacter } from './characterController.js';
import Character from '../models/Character.js';

// export async function postBattle(req, res, next) {
//     try {
//         const shopItems = await Character.find();
//         res.status(200).send({ shopItems });
//     } catch (err) {
//         next(err);
//     }
// }

const testBattle = [
    {
        attacker: 'Muscleman',
        defender: 'MSILAPPY',
        winner: 'Muscleman',
        winnersGold: 120,
    }
]

export async function postTestBattle(req, res, next) {
    const { characterName } = req.params
    //take req.params as defender, attacker logic unsure, need to get request defender & attacker stats to implement battle logic
    try {

        const attackingChar = 'Muscleman'
        const defender = await Character.findOne({ characterName })
        const attacker = await Character.findOne({ characterName: attackingChar })
        console.log("defender: ", defender, "attacker: ", attacker);
        if (attacker.attack > defender.defense) { console.log(`${attacker.characterName} wins ${defender.gold} gold!!, you did ${attacker.attack} damage and your opponent did ${defender.defense}`); }
        const result = await Battle.create(testBattle);
        console.log("result: ", result);
        res.status(200).json({ result });
    } catch (err) {
        next(err)
    }
}