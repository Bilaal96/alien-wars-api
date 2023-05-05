import Character from '../models/Character.js';
import { Shop } from '../models/Shop.js';

export async function getItems(req, res, next) {
  try {
    const shopItems = await Shop.find();
    res.status(200).send({ shopItems });
  } catch (err) {
    next(err);
  }
}

export async function getSingleItem(req, res, next) {
  const { id: itemId } = req.params;

  try {
    const item = await Shop.findById(itemId);
    res.status(200).send({ item });
  } catch (err) {
    next(err);
  }
}

export async function patchPurchaseItem(req, res, next) {
  const { id: itemId } = req.params; // used to fetch item
  const { username } = req.user; // used to update character

  const item = await Shop.findById(itemId);
  const character = await Character.findOne({ username });

  // Check if inventory already contains the item
  if (character.gold < item.cost) {
    res
      .status(400)
      .json({ message: "You don't have enough gold to purchase this item" });
  } else if (character.inventory.includes(item.itemName)) {
    // Character already owns item
    res.status(400).json({ message: 'You already own this item' });
  } else {
    // Add item to inventory
    character.inventory.push(item.itemName);

    // Update character stats based on item type
    switch (item.type) {
      case 'weapon':
        character.attack = item.attackStat;
        break;
      case 'armour':
        character.defense = item.defenceStat;
        break;
      default:
        throw Error('Invalid weapon type');
    }

    // Update user gold
    character.gold -= item.cost;

    // Save updates to character in DB
    await character.save().then((updatedCharacter) => {
      console.log(updatedCharacter);
      res.status(200).json({ updatedCharacter });
    });
  }
}

// Test populating the DB with one request
const testShopData = [
  {
    type: 'weapon',
    itemName: 'Laser Baton',
    attackStat: 10,
    defenceStat: 0,
    buff: null,
    cost: 100,
  },
  {
    type: 'weapon',
    itemName: 'Plasma Sword',
    attackStat: 50,
    defenceStat: 0,
    buff: null,
    cost: 500,
  },
  {
    type: 'weapon',
    itemName: 'Beam Rifle',
    attackStat: 100,
    defenceStat: 0,
    buff: null,
    cost: 1000,
  },
  {
    type: 'armor',
    itemName: 'Wooden Shield',
    attackStat: 0,
    defenceStat: 10,
    buff: null,
    cost: 100,
  },
  {
    type: 'armor',
    itemName: 'Durasteel Protector',
    attackStat: 0,
    defenceStat: 50,
    buff: null,
    cost: 500,
  },
  {
    type: 'armor',
    itemName: 'Electrum Defender',
    attackStat: 0,
    defenceStat: 100,
    buff: null,
    cost: 1000,
  },
  {
    type: 'potion',
    itemName: 'Health Potion',
    attackStat: 0,
    defenceStat: 0,
    buff: 'healing',
    cost: 50,
  },
  {
    type: 'potion',
    itemName: 'Mana Potion',
    attackStat: 0,
    defenceStat: 0,
    buff: 'mana',
    cost: 50,
  },
  {
    type: 'potion',
    itemName: 'Strength Potion',
    attackStat: 10,
    defenceStat: 0,
    buff: 'strength',
    cost: 100,
  },
];

export async function postPopulateShop(req, res, next) {
  try {
    const shop = await Shop.create(testShopData);
    res.status(200).json({ shop });
  } catch (err) {
    next(err);
  }
}
