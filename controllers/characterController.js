import Character from "../models/Character.js";

// test branch
export async function createCharacter(req, res, next) {
  console.log(req.body);
  console.log(req.session);
  const { race, characterName, username } = req.body;
  try {
    if (race === "human") {
      // set a human with the following properties
      const character = await Character.create({
        race,
        username: username,
        characterName: characterName,
        attack: 100,
        defense: 110,
        gold: 100,
      });
      res.status(201).json({ character });
    } else if (race === "alien") {
      const character = await Character.create({
        race,
        username: username,
        characterName: characterName,
        attack: 110,
        defense: 100,
        gold: 100,
      });
      res.status(201).json({ character });
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllCharacters(req, res, next) {
  try {
    const characters = await Character.find();
    res.status(200).send({ characters });
  } catch (err) {
    next(err);
  }
}

export async function getCharacter(req, res, next) {
  const { characterName } = req.params;
  console.log(characterName);
  try {
    const character = await Character.findOne({ characterName });
    res.status(200).json({ character });
  } catch (err) {
    next(err);
  }
}
