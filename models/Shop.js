import mongoose from 'mongoose';

const { Schema } = mongoose;

const shopItemSchema = new Schema({
  type: String,
  itemName: { type: String, required: true, unique: true },
  attackStat: { type: Number },
  defenceStat: { type: Number },
  buff: { type: String },
  cost: { type: Number, required: true },
});

export const Shop = mongoose.model('shop', shopItemSchema);
