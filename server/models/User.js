const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  roomid: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  queue: {
    type: Array,
    default: null,
  },
});

module.exports = mongoose.model('User', UserSchema);

