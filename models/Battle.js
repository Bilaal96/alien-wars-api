import mongoose from "mongoose";
const { Schema } = mongoose;

const battleSchema = new Schema({
  attacker: { type: String, required: true },
  defender: { type: String, required: true },
  winner: { type: String, required: true },
  loser: { type: String, required: true },
  spoils: { type: Number, required: true },
  timeStamp: { type: Date, default: Date.now },
});

export const Battle = mongoose.model("battle", battleSchema);
