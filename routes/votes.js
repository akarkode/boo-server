const express = require('express');
const Vote = require('../models/Vote');
const Profile = require('../models/Profile');
const r = express.Router();

r.post('/:profileId', async (req, res) => {
  const { userId, system, value } = req.body;
  const { profileId } = req.params;
  await Vote.findOneAndUpdate(
    { profileId, userId, system },
    { $set: { value } },
    { upsert: true, new: true }
  );
  const votes = await Vote.find({ profileId, system });
  const counts = {};
  votes.forEach(v => { counts[v.value] = (counts[v.value] || 0) + 1; });
  await Profile.updateOne(
    { _id: profileId },
    { $set: { [`votes.${system}`]: counts } }
  );
  res.status(200).json({ ok: true });
});

r.get('/:profileId', async (req, res) => {
  const p = await Profile.findById(req.params.profileId).lean();
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p.votes || { mbti: {}, enneagram: {}, zodiac: {} });
});

module.exports = r;
