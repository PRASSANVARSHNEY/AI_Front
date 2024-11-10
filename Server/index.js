const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not Connected:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/authRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// Server Initialization
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
