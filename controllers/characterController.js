import Character from '../models/Character.js';

// test branch
export async function createCharacter(req, res, next) {
  console.log(req.body);
  console.log(req.session);
  const { race, characterName, username } = req.body;
  try {
    if (race === 'human') {
      // set a human with the following properties
      const character = await Character.create({
        race,
        username: username,
        characterName: characterName,
        attack: 10,
        defense: 11,
        gold: 100,
      });
      res.status(201).json({ character });
    } else if (race === 'alien') {
      const character = await Character.create({
        race,
        username: username,
        characterName: characterName,
        attack: 11,
        defense: 10,
        gold: 100,
      });
      res.status(201).json({ character });
    }
  } catch (err) {
    next(err);
  }
}
