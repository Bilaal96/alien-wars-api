import Shop from '../models/Shop.js';
import Character from '../models/Character.js';

import shopData from '../db/data/dev-data/items.js';

// Repopulate the shop collection with shopData
export async function postPopulateShopWithItems(req, res, next) {
  try {
    // Delete existing items, then add shopData to shop collection
    await Shop.deleteMany({});
    const shopItems = await Shop.create(shopData);
    res.status(200).json({ shopItems });
  } catch (err) {
    next(err);
  }
}

export async function getShopItems(req, res, next) {
  // Filter items by type if query param is provided, otherwise get all items
  const { itemType } = req.query;
  const itemsFilter = itemType ? { type: itemType } : {};

  try {
    const shopItems = await Shop.find(itemsFilter);
    res.status(200).json({ shopItems });
  } catch (err) {
    next(err);
  }
}

export async function getShopItemById(req, res, next) {
  const { itemId } = req.params;

  try {
    const shopItem = await Shop.findById(itemId);
    res.status(200).json({ shopItem });
  } catch (err) {
    next(err);
  }
}

export async function patchPurchaseShopItem(req, res, next) {
  const { itemId } = req.params; // used to fetch item
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
        character.attack = item.attack;
        break;
      case 'armour':
        character.defence = item.defence;
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
