import mongoose from 'mongoose';

const { Schema } = mongoose;

const battleSchema = new Schema({
    attacker: { type: String, required: true, unique: true },
    defender: { type: String, required: true, unique: true },
    battleId: UUID,
    winner: { type: String, required: true, unique: true },
    winnersGold: { type: Number, required: true },
    timeStamp: { type: Date, default: Date.now },
});

export const Battle = mongoose.model('battle', battleSchema);