var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  songname: {
    type: String,
    unique: true,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
  },
  duration: {
    type: Number
  },
  url: {
    type: String
  }
});

module.exports = mongoose.model('Song', SongSchema);

