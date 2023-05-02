import User from '../models/User.js';

/** Register logic
 * Check if user already exists - LocalStrategy handles this
 */
export async function registerUser(req, res) {
  const { username, password } = req.body;

  // User does not exist, create user
  const user = await User.create({ username, password });

  res.status(201).send({ user });
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
