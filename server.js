// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

// routes
app.use('/api/registrations', registrationRoutes);

// health check
app.get('/', (req, res) => res.send('Conference Registration API is running'));

// connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
