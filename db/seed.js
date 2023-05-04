import mongoose from "mongoose";
import dotenv from "dotenv";

// const conn = mongoose.connection;

dotenv.config();

// Load Models
import User from "../models/User.js";
import Character from "../models/Character.js";
import { Shop } from "../models/Shop.js";

import testUsers from "./data/test-data/users.js";
import testCharacters from "./data/test-data/characters.js";
import testItems from "./data/test-data/items.js";

export const seedDB = async () => {
  await Shop.deleteMany({});
  await Character.deleteMany({});
  await User.deleteMany({});
  await User.insertMany(testUsers);
  await Character.insertMany(testCharacters);
  await Shop.insertMany(testItems);
};
