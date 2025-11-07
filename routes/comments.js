const express = require('express');
const Comment = require('../models/Comment');
const r = express.Router();

r.post('/', async (req, res) => {
  const { profileId, userId, title, body, tags } = req.body;
  const c = await Comment.create({ profileId, userId, title, body, tags });
  res.status(201).json(c);
});

r.get('/by-profile/:id', async (req, res) => {
  const { sort, mbti, enneagram, zodiac } = req.query;
  const filter = { profileId: req.params.id };
  if (mbti) filter['tags.mbti'] = mbti;
  if (enneagram) filter['tags.enneagram'] = enneagram;
  if (zodiac) filter['tags.zodiac'] = zodiac;
  const query = sort === 'best' ? Comment.find(filter).sort({ likes: -1 }) : Comment.find(filter).sort({ createdAt: -1 });
  const comments = await query.lean();
  res.json(comments);
});

r.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  const c = await Comment.findById(req.params.id);
  if (!c) return res.status(404).json({ message: 'Not found' });

  const userIdStr = String(userId);
  const exists = c.likedBy.some(u => String(u) === userIdStr);

  if (exists) {
    c.likedBy = c.likedBy.filter(u => String(u) !== String(userId)); // 🔥 bagian penting
  } else {
    c.likedBy.push(userId);
  }

  c.likes = c.likedBy.length;
  await c.save();

  res.json({ likes: c.likes, liked: !exists });
});


module.exports = r;
