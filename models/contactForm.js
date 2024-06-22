// models/contactForm.js
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    msg: String
}, {collection: 'ContactForm'});
var form = mongoose.model('ContactForm', schema);

module.exports = form