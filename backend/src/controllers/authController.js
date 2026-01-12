const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    const token = signToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); 
    
    if (!user) return res.status(401).json({ message: 'bruh, u blind?' });
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'try again bruh' });
    
    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};