import mongoose from 'mongoose';

const { Schema } = mongoose;

const shopItemSchema = new Schema({
  type: String,
  itemName: { type: String, required: true, unique: true },
  attack: { type: Number },
  defence: { type: Number },
  buff: { type: String },
  cost: { type: Number, required: true },
});

// 3rd argument prevents pluralisation of collection name; i.e. use "shop", not "shops"
export const Shop = mongoose.model('shop', shopItemSchema, 'shop');
