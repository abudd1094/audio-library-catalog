const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

// Load Models
const User = require('../../models/User');

// @route   POST api/artists
// @desc    Add Artist
// @access  Public


module.exports = router;