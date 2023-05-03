import mongoose from 'mongoose';

const { Schema } = mongoose;

const shopItemSchema = new Schema({
    itemName: { type: String, required: true, unique: true },
    attackStat: { type: Number },
    defenceStat: { type: Number },
    buff: { type: String },
    cost: { type: Number, required: true }
})

const shopSchema = new Schema({
    children: [shopItemSchema]
})

export const ShopItem = mongoose.model('shopItem', shopItemSchema);

export const Shop = mongoose.model('shop', shopSchema)