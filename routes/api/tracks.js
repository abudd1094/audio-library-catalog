const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check');

// Load Models
const Track = require('../../models/Track');
const Artist = require('../../models/Artist');
const Album = require('../../models/Album');
const User = require('../../models/User');

// @route   GET api/tracks/mylibrary
// @desc    Get all tracks in a user's library
// @access  Private
router.get('/mylibrary', auth, async (req, res) => {
  try {
    const tracks = await Track.find({ user: req.user.id })
    res.json(tracks);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
})

// @route   POST api/tracks
// @desc    Add a track
// @access  Private
router.post(
  '/',
  auth, 
  [
    check('title', 'Please include a title').exists(),
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { // if there are errors, do this:
      return res.status(400).json({ errors: errors.array() });
    }

    // const user = await User.findById(req.user.id).select('-password') 
    const { title, artist, album, bpm } = req.body; 

    try {
      // See if track already exists
      let track = await Track.findOne({ title });
      if(track) {
        return res.status(400).json({ errors: [{ msg: 'Track already exists' }] });
      }

      // See if artist already exists
      let existingArtist = await Artist.findOne({ artistName: artist })
      let artist_id

      if(existingArtist) {
        artist_id = existingArtist.id
        console.log('artist exists')
      } else {
        newArtist = new Artist({
          user_id: req.user.id,
          artistName: artist
        })

        await newArtist.save()

        artist_id = newArtist.id
        console.log('created new artist')
      }

      // See if album already exists
      let existingAlbum = await Album.findOne({ albumName: album, artist_id })
      let album_id

      if(existingAlbum) {
        album_id = existingAlbum.id
        console.log('album exists')
      } else {
        newAlbum = new Album({
          user_id: req.user.id,
          artist_id,
          albumName: album
        })

        await newAlbum.save()

        album_id = newAlbum.id
        console.log('created new album')
      }

      track = new Track({
        user_id: req.user.id,
        title,
        artist_id,
        album_id,
        bpm
      })

      await track.save()

      res.json(track)

    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    };
  }
)

module.exports = router;