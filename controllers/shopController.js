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

/**
 * TODO: Possible improvement to getShopItems
 * Only send back items that a user does not own
 * Or suggest on frontend to add a check for character attack/defence > item attack/defence - then show message - attack/defence level too low
 */
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

  if (character.gold < item.cost) {
    // User does not have enough gold
    return res
      .status(400)
      .json({ message: "You don't have enough gold to purchase this item" });
  } else if (item.itemName === character.inventory[item.type]) {
    // Determine if item for requested purchase is already equipped
    return res
      .status(400)
      .json({ message: 'You already have this item equipped' });
  }

  // Does equipped item have higher attack/defence stat
  const isItemAnUpgrade = (affectedStat) =>
    item[affectedStat] > character[affectedStat];

  // Reusable function to update character in DB
  const saveChangesToCharacter = async () => {
    await character.save().then((updatedCharacter) => {
      console.log(updatedCharacter);
      return res.status(200).json({ updatedCharacter });
    });
  };

  if (item.type === 'weapon' && isItemAnUpgrade('attack')) {
    // Update weapon slot
    character.inventory[item.type] = item.itemName;
    // Update character attack stat
    character.attack = item.attack;
    // Save updates to character in DB
    return await saveChangesToCharacter();
  } else if (item.type === 'armour' && isItemAnUpgrade('defence')) {
    // Update armour slot
    character.inventory[item.type] = item.itemName;
    // Update character defence stat
    character.defence = item.defence;
    // Save updates to character in DB
    return await saveChangesToCharacter();
  } else {
    // Item does not improve character stats - do not buy
    return res.status(400).json({ message: 'You already have a better item' });
  }
}
