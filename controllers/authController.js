import User from '../models/User.js';

/** registerUser
 * Since we have set username to be a unique field in the userSchema, a new user cannot use a username that already exists
 * If they attempt this, the Model.create function throws a duplicate error
 * This error is handled via error handling middleware
 */
export async function registerUser(req, res, next) {
  const { email, username, password } = req.body;

  try {
    // User does not exist, create user
    const newUser = await User.create({ email, username, password });

    // Construct user response object - delete password
    const user = { ...newUser._doc };
    delete user.password;

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res) {
  console.log('login', req.session);

  res.status(200).json({ message: 'User logged in successfully' });
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

// TODO - requires session cookie (to authorize request) to test endpoint
export async function updatePassword(req, res, next) {
  const { newPassword } = req.body;
  const userId = req.session.passport.user;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });

    res
      .status(200)
      .json({ message: 'Password successfully updated', pw: user.password });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res
      .status(200)
      .json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    next(err);
  }
}
