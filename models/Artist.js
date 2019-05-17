const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ArtistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users', 
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = Track = mongoose.model('artists', ArtistSchema); // takes route name & schema