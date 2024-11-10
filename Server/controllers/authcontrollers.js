const bcrypt = require('bcrypt');
const User = require('../models/user');

// Test Route
const test = (req, res) => {
  res.json({ message: 'Test is working' });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate Name
    if (!name) {
      return res.status(400).json({ status: 'error', message: 'Name is required.' });
    }

    // Validate Password
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Password must be at least 6 characters long.' });
    }

    // Check if Email Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email is already taken.' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond with Success
    return res.status(201).json({ status: 'success', message: 'User registered successfully!', user });
  } catch (error) {
    console.error('Error in registerUser:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

module.exports = {
  test,
  registerUser,
};
