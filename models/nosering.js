// models/nosering.js
const mongoose = require('mongoose');

const noseringsSchema = new mongoose.Schema({
  // Define your schema fields here
  // Example:
    number: Number,
    weight: String,
    price: String,
    image_address: String
}, { collection: 'Noserings' });

const Nosering = mongoose.model('Nosering', noseringsSchema);

module.exports = Nosering;
