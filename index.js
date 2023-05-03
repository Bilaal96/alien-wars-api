import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

import authRoute from "./routes/authRoute.js";
import characterRoute from "./routes/characterRoute.js";

dotenv.config();
const PORT = 9090;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Run DB config
import "./db/connection.js";

// Use passport local strategy
import "./config/passport.js";

// Create a session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      collection: "sessions",
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

app.get("/api", (req, res) => {
  res.status(200).send({ msg: "Test endpoint" });
});

app.use("/api/auth", authRoute);
app.use("/api/character", characterRoute);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

export default app;
