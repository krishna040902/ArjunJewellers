const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderID: String,  // Unique ID for the order
    items: [{
        number: Number,
        weight: String,
        price: String,
        image_address: String
    }],
    email: String,  // Reference to the user's email
    date: { type: Date, default: Date.now },  // Timestamp for the order
    paymentMethod: String,
    orderStatus: String
}, { collection: 'Orders' });

var Order = mongoose.model('Orders', orderSchema);

module.exports = Order;
