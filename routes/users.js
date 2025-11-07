const express = require('express');
const User = require('../models/User');
const r = express.Router();

r.post('/', async (req, res) => {
  const u = await User.create({ name: req.body.name });
  res.status(201).json(u);
});

r.get('/', async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = r;
