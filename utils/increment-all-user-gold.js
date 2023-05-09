import Character from '../models/Character.js';

export async function incrementAllUserGold(amount = 100) {
  try {
    await Character.updateMany({ $inc: { gold: amount } });
  } catch (err) {
    throw err;
  }
}

export const updateGoldInterval = 1000 * 60 * 60;
