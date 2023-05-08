import Character from '../models/Character.js';

export async function postCharacter(req, res, next) {
  const { race, characterName, username } = req.body;

  try {
    if (race === 'human') {
      // Create a character with base properties of a human
      const character = await Character.create({
        race,
        username,
        characterName,
        attack: 100,
        defence: 110,
        gold: 100,
      });
      res.status(201).json({ character });
    } else if (race === 'alien') {
      // Create a character with base properties of an alien
      const character = await Character.create({
        race,
        username,
        characterName,
        attack: 110,
        defence: 100,
        gold: 100,
      });
      res.status(201).json({ character });
    } else {
      res.status(400).json({
        message: `Cannot create a character with a race of "${race}"`,
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllCharacters(req, res, next) {
  try {
    const characters = await Character.find({});
    res.status(200).json({ characters });
  } catch (err) {
    next(err);
  }
}

export async function getCharacter(req, res, next) {
  try {
    // Keys accepted as query parameters
    const validQueryKeys = ['username', 'characterName'];
    const queryKeys = Object.keys(req.query);

    // Returns true if ALL query parameters provided are whitelisted in validQueryKeys, and false otherwise
    const queryKeysAreValid =
      queryKeys.length &&
      queryKeys.every((queryKey) => validQueryKeys.includes(queryKey));

    // 400: Return error message to client if any query params passed are not whitelisted
    if (!queryKeysAreValid)
      return res.status(400).json({ message: 'Invalid query' });

    // Query DB for character
    const character = await Character.findOne(req.query);
    if (character) {
      // 200: Find the character in DB with properties matching all key-value pairs provided by query params
      res.status(200).json({ character });
    } else {
      // 404: If character is not found (i.e. is null) return error message to display
      res.status(404).json({
        message: 'There is no character that matches the received criteria',
      });
    }
  } catch (err) {
    next(err);
  }
}
