import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// If new user, salt & hash password
userSchema.pre('save', async function (next) {
  // Skip to next middleware if password is not modified
  // if(!this.isModified("password")) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;
