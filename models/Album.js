const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AlbumSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  artist_id: {
    type: Schema.Types.ObjectId,
    ref: 'artists'
  },
  albumName: {
    type: String,
    required: true
  },
  year: {
    type: String
  },
  label: {
    type: String
  },
  genre: {
    type: String
  }
});

module.exports = Track = mongoose.model('albums', AlbumSchema); // takes route name & schema