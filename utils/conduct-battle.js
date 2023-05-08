// Returns a random integer between min (inclusive) and max (inclusive)
function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Executes a battle scenario and determines the winner.
 * Base damage of attacker & defender is randomised (+/- 20%).
 * This adds the element of chance, making it possible for the participant with lower damage to steal the win.
 */
const conductBattle = (attacker, defender) => {
  // Get min & max damage limits for attacker and defender
  const MIN_DMG_MULTIPLIER = 0.8;
  const MAX_DMG_MULTIPLIER = 1.2;
  const attackerMinDamage = attacker.attack * MIN_DMG_MULTIPLIER;
  const attackerMaxDamage = attacker.attack * MAX_DMG_MULTIPLIER;
  const defenderMinDamage = defender.defence * MIN_DMG_MULTIPLIER;
  const defenderMaxDamage = defender.defence * MAX_DMG_MULTIPLIER;

  // Select random damage value within the given range for both attacker & defender
  const attackerDamage = getRandomIntInRange(
    attackerMinDamage,
    attackerMaxDamage
  );
  const defenderDamage = getRandomIntInRange(
    defenderMinDamage,
    defenderMaxDamage
  );
  console.log({ attackerDamage, defenderDamage });

  // Determine winner of the battle
  if (attackerDamage > defenderDamage) {
    return { winner: attacker, loser: defender };
  } else if (attackerDamage < defenderDamage) {
    return { winner: defender, loser: attacker };
  } else if (attackerDamage === defenderDamage) {
    // Retry battle if attacker's & defender's damage are equal
    return conductBattle(attacker, defender);
  }
};

export default conductBattle;
