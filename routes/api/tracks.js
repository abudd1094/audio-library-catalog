const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check');

// Load Models
const Track = require('../../models/Track');
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
    check('artist', 'Please include an artist').exists()
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { // if there are errors, do this:
      return res.status(400).json({ errors: errors.array() });
    }

    // const user = await User.findById(req.user.id).select('-password') 
    const { title, artist, album, year, label, genre } = req.body; 

    try {
      // See if track already exists
      let track = await Track.findOne({ title, artist });
      if(track) {
        return res.status(400).json({ errors: [{ msg: 'Track already exists' }] });
      }

      track = new Track({
        user: req.user.id,
        title,
        artist,
        album,
        year,
        label,
        genre,
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