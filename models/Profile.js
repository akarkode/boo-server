const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '/static/wing.png' },
  votes: {
    mbti: { type: Map, of: Number, default: {} },
    enneagram: { type: Map, of: Number, default: {} },
    zodiac: { type: Map, of: Number, default: {} }
  }
}, { timestamps: true });

module.exports = model('Profile', ProfileSchema);
