import Character from '../models/Character.js';

export async function updateGoldAtInterval() {
  try {
    const characters = await Character.find();

    characters.forEach(async (character) => {
      await Character.findByIdAndUpdate(character.id, {
        gold: character.gold + 100,
      });
    });
  } catch (err) {
    throw err;
  }
}

export const updateInterval = 1000 * 60 * 60;
