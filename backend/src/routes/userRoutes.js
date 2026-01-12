const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;