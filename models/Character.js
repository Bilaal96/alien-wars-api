import mongoose from 'mongoose';

const { Schema } = mongoose;

const characterSchema = new Schema({
  username: { type: String, required: true, unique: true },
  characterName: { type: String },
  race: { type: String },
  gold: { type: Number },
  attack: { type: Number },
  defence: { type: Number },
  inventory: [String],
});

const Character = mongoose.model('character', characterSchema);

export default Character;
