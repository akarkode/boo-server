'use strict';

const express = require('express');
const Profile = require('../models/Profile');
const Comment = require('../models/Comment');

const pages = express.Router();
const api = express.Router();

api.post('/', async (req, res) => {
  const { name, bio, avatarUrl } = req.body;
  const p = await Profile.create({ name, bio, avatarUrl });
  res.status(201).json(p);
});

api.get('/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) return res.status(404).json({ message: 'Not found' });
  res.json(profile);
});

pages.get('/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id).lean();
  if (!profile) return res.status(404).send('Profile not found');
  const comments = await Comment.find({ profileId: profile._id })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  res.render('profile_template', {
    profile,
    votes: profile.votes || { mbti: {}, enneagram: {}, zodiac: {} },
    comments
  });
});

module.exports = { pages, api };
