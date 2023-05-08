import mongoose from 'mongoose';

const { Schema } = mongoose;

const battleSchema = new Schema(
  {
    attacker: { type: String, required: true },
    defender: { type: String, required: true },
    winner: { type: String, required: true },
    loser: { type: String, required: true },
    spoils: { type: Number, required: true },
  },
  // Auto-add 'timestamp' property, representing the date a specific battle document was created at
  { timestamps: { createdAt: 'timestamp', updatedAt: false } }
);

const Battle = mongoose.model('battle', battleSchema);

export default Battle;
