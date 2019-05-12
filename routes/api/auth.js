const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Test auth route
// @access  Private
router.get('/', (req, res) => {
  res.send('hello world!')
});

module.exports = router;