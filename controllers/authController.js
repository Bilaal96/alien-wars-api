import User from '../models/User.js';

/** registerUser
 * Since we have set username to be a unique field in the userSchema, a new user cannot use a username that already exists
 * If they attempt this, the Model.create function throws a duplicate error
 * This error is handled via error handling middleware
 */
export async function registerUser(req, res, next) {
  const { username, password } = req.body;

  try {
    // User does not exist, create user
    const user = await User.create({ username, password });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res) {
  console.log('login', req.session);

  res.status(200).send({ message: 'User logged in successfully' });
}

export async function logoutUser(req, res) {
  console.log('logout', req.session);

  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) throw err;
    });

    res.status(200).json({ message: 'User logged out successfully' });
  } else {
    res.status(200).json({ message: 'There is no user logged in' });
  }
}