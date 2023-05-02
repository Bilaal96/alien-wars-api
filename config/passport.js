import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

const verifyCallback = async (username, password, done) => {
  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) done(null, false, { message: 'User not found' });

    // Password does not match
    const passwordsMatch = await user.comparePassword(password);
    if (!passwordsMatch) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    // Password does match
    return done(null, user);
  } catch (err) {
    throw err;
  }
};

const localStrategy = new LocalStrategy(verifyCallback);

passport.use(localStrategy);

// Registers a function used to serialize user objects into the session
// i.e. Store user id in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Passport dictates when to end a user session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
