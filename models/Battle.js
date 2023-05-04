import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto'
const { Schema } = mongoose;

const battleSchema = new Schema({
    attacker: { type: String, required: true },
    defender: { type: String, required: true },
    winner: { type: String, required: true },
    winnersGold: { type: Number, required: true },
    timeStamp: { type: Date, default: Date.now },
});

export const Battle = mongoose.model('battle', battleSchema);