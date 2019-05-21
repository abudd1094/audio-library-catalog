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
// @desc    Get all tracks in a user's libraries
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
    const { title, artist, album, year, bpm } = req.body; 

    try {
      // See if track title exists under specified artist catalog
      let existingArtist = await Artist.findOne({ artistName: artist })
      let track = await Track.findOne({ title });

      let artist_id

      if(track && existingArtist) {
        return res.status(400).json({ errors: [{ msg: 'Track already exists' }] });
      }

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
        year,
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

// @route   GET api/tracks/:id
// @desc    Get a track by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
      const track = await Track.findById(req.params.id)

      if(!track) {
        return res.status(404).json({ msg: 'Track not found' })
      }
  
      res.json(track)
    } catch(err) {
      console.error(err.message)
      if(err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Track not found' })
      }
      res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/tracks/:id
// @desc    Delete a track
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const track = await Track.findById(req.params.id)

    // Check if track exists
    if(!track) {
      return res.status(404).json({ msg: 'Track not found' })
    }

    await track.remove();

    res.json({ msg: 'Track removed' })
  } catch(err) {
    console.error(err.message)
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Track not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/tracks/:id
// @desc    Edit a track
// @access  Private
// router.put('/:id', auth, async (req, res) => {
//     const { title, artist, album, year, bpm } = req.body;    
  

//     } catch(err) {
//       console.error(err.message)
//       if(err.kind === 'ObjectId') {
//         return res.status(404).json({ msg: 'Track not found' })
//       }
//       res.status(500).send('Server Error')
//     }
//   }
// )

module.exports = router;