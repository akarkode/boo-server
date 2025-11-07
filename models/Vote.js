const { Schema, model, Types } = require('mongoose');

const VoteSchema = new Schema({
  profileId: { type: Types.ObjectId, ref: 'Profile', required: true, index: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  system: { type: String, enum: ['mbti', 'enneagram', 'zodiac'], required: true },
  value: { type: String, required: true }
}, { timestamps: true });

VoteSchema.index({ profileId: 1, userId: 1, system: 1 }, { unique: true });

module.exports = model('Vote', VoteSchema);
