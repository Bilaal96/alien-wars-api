function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



export const battleRNGMaker = (attacker, defender) => {

    const attackerBuff = attacker.attack * 1.2
    const attackerDebuff = attacker.attack * 0.8
    const defenderBuff = defender.defense * 1.2
    const defenderDebuff = defender.defense * 0.8

    const attackerDamage = getRandomInt(attackerDebuff, attackerBuff)
    const defenderDamage = getRandomInt(defenderDebuff, defenderBuff)

    if (attackerDamage > defenderDamage) {
        return attacker
    }
    else if (attackerDamage < defenderDamage) { return defender }
    else if (attackerDamage === defenderDamage) {
        return battleRNGMaker(attacker, defender);

    }


}




/*

 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
*/



