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
