const { Schema, model, Types } = require('mongoose');

const TagSchema = new Schema({
  mbti: { type: String, default: null },
  enneagram: { type: String, default: null },
  zodiac: { type: String, default: null }
}, { _id: false });

const CommentSchema = new Schema({
  profileId: { type: Types.ObjectId, ref: 'Profile', required: true, index: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: '' },
  body: { type: String, required: true },
  tags: { type: TagSchema, default: {} },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = model('Comment', CommentSchema);
