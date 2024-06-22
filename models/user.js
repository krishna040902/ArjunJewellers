// models/user.js
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    password: String
}, {collection: 'Users'});
var User = mongoose.model('Users', schema);

module.exports = User