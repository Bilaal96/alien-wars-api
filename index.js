import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cors from 'cors';

// Routes
import authRoute from './routes/authRoute.js';
import characterRoute from './routes/characterRoute.js';
import battleRoute from './routes/battleRoute.js';
import shopRoute from './routes/shopRoute.js';

// Utils
import {
  incrementAllUserGold,
  updateGoldInterval,
} from './utils/increment-all-user-gold.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Run DB config
import './db/connection.js';

// Use passport local strategy
import './config/passport.js';

// Create a session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      collection: 'sessions',
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // equals 1 day in milliseconds
    },
  })
);

// Reinitialize/refresh passport middleware to avoid stale session data - e.g. a session may have expired since the last request
app.use(passport.initialize());
// Hook into express-session and use the session for authentication
app.use(passport.session());

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to Cosmic Conflict' });
});

app.use('/api/auth', authRoute);
app.use('/api/characters', characterRoute);
app.use('/api/battle', battleRoute);
app.use('/api/shop', shopRoute);

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);

  // Update each character's gold at the given interval
  setInterval(incrementAllUserGold, updateGoldInterval);
});

export default app;
