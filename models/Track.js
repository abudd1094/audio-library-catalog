const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TrackSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users' 
  },
  artist_id: {
    type: Schema.Types.ObjectId,
    ref: 'artists'
  },
  album_id: {
    type: Schema.Types.ObjectId,
    ref: 'albums'
  },
  title: {
    type: String,
    required: true
  },
  bpm: {
    type: Number
  }
});

module.exports = Track = mongoose.model('tracks', TrackSchema); // takes route name & schema