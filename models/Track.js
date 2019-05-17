const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TrackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users', 
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String
  },
  year: {
    type: String
  },
  label: {
    type: String
  },
  genre: {
    type: String
  },
  bpm: {
    type: Number
  }
});

module.exports = Track = mongoose.model('tracks', TrackSchema); // takes route name & schema