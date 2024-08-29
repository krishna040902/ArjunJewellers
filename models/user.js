// models/user.js
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    address: String,
    password: String,
    cart: [{
        number: Number,
        weight: String,
        price: String,
        image_address: String
    }],
    orders: [String] 
}, {collection: 'Users'});
var User = mongoose.model('Users', schema);

module.exports = User