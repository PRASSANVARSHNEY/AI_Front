const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT
const validator = require('validator'); // For input validation
const User = require('../models/user'); // User model
const router = express.Router();

// Environment Variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Input Validation
  if (!name || !email || !password) {
    return res.status(400).json({ status: 'error', message: 'All fields are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ status: 'error', message: 'Invalid email format.' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Password must be at least 6 characters long.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email already in use.' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and Save User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT (Optional)
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1d', // Token valid for 1 day
    });

    // Respond with Success
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully!',
      token, // Include token in the response
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

module.exports = router;
