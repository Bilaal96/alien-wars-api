import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Executes before save() or create() is called
// NOTE: create() is a shorthand which calls save() under-the-hood
userSchema.pre('save', async function (next) {
  // Skip to next middleware if password is not modified
  // Useful for update/change password feature
  // if(!this.isModified("password")) return next();

  // Hash password for secure storage
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;
