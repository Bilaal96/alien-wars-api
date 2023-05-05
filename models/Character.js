import mongoose from 'mongoose';

const { Schema } = mongoose;

const characterSchema = new Schema({
  username: { type: String, required: true, unique: true },
  characterName: { type: String },
  race: { type: String },
  gold: { type: Number },
  attack: { type: Number },
  defense: { type: Number },
  inventory: [String],
});

// characterSchema.pre('save', async function (next) {
//   next();
// });

const Character = mongoose.model('character', characterSchema);

export default Character;
