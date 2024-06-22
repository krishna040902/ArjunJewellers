// routes/shop.js
const express = require('express');
const Earring = require('../models/earring');
const Nosepin = require('../models/nosepin');
const Nosering = require('../models/nosering');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const earrings = await Earring.find({});
    const nosepins = await Nosepin.find({});
    const noserings = await Nosering.find({});
    res.render('shop', { earrings, nosepins, noserings });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
