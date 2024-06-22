// models/earring.js
const mongoose = require('mongoose');

const earringsSchema = new mongoose.Schema({
  // Define your schema fields here
  // Example:
    number: Number,
    weight: String,
    price: String,
    image_address: String
}, { collection: 'Earrings' });

const Earring = mongoose.model('Earring', earringsSchema);

module.exports = Earring;
