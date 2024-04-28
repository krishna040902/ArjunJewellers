// models/nosepin.js
const mongoose = require('mongoose');

const nosepinsSchema = new mongoose.Schema({
  // Define your schema fields here
  // Example:
    number: Number,
    weight: String,
    price: String,
    image_address: String
}, { collection: 'Nosepins' });

const Nosepin = mongoose.model('Nosepin', nosepinsSchema);

module.exports = Nosepin;
