const express = require('express');
const router = express.Router();
const multer = require('multer')
const User = require('../models/user')
const path = require("path");
const authMiddleware = require('../middlewares/authMiddleware')
const Order = require('../models/orders');  // Import the Order model
const { v4: uuidv4 } = require('uuid');  // Import uuid for generating unique IDs

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        const userEmail = req.session.useremail;
        const fileExtension = path.extname(file.originalname);
        const fileName = `${path.basename(file.originalname, fileExtension)}_${userEmail}${fileExtension}`;
        cb(null, fileName); // File name format: image_name_user_email.jpg/png
    }
});
const upload = multer({ storage: storage });


router.get('/', authMiddleware, async (req, res) => {
    const user = await User.findOne({ email: req.session.useremail })
    const items = user.cart;
    // Calculating total price
    let intPrice = 0;
    items.forEach(item => {
        const priceString = item.price
        intPrice += parseInt(priceString.replace(/\D/g, ''), 10);
    });
    let formattedPrice = "Rs. " + intPrice.toLocaleString('en-IN');
    res.render('checkout',
        {
            user: req.session.isAuth,
            username: req.session.username,
            mobile: user.mobile,
            email: user.email,
            address: user.address,
            totalprice: formattedPrice
        })
})

// router.post('/', authMiddleware, (req, res) => {
//     console.log(req.body)
//     // The below line is very important otherwise checkout page will not load.
//     // JavaScript (jscart.js):

//     // When the checkout button is clicked, it sends a POST request to the /checkout endpoint.
//     // If the request is successful, it redirects the user to the /checkout page using window.location.href.
//     // Server-side route (checkout.js):

//     // The POST route processes the checkout logic and responds with a JSON message.
//     // Ensure that after processing, you return a status of 200 to indicate success.
//     res.status(200).json({ message: 'Checkout successful!' });
// })

// POST route to handle payment confirmation and file uploads
router.post('/',authMiddleware, upload.fields([
    { name: 'netbanking-screenshot', maxCount: 1 },
    { name: 'upi-screenshot', maxCount: 1 }
]), async (req, res) => {
    try {
        const { payment } = req.body;
        let paymentScreenshot = null;
        const userEmail = req.session.useremail;

        // Check which payment method was selected and set the corresponding screenshot
        if (payment === 'netbanking' && req.files['netbanking-screenshot']) {
            paymentScreenshot = req.files['netbanking-screenshot'][0].path;
        } else if (payment === 'upi' && req.files['upi-screenshot']) {
            paymentScreenshot = req.files['upi-screenshot'][0].path;
        }

        // Generate a unique Order ID
        const orderID = uuidv4();

        // Find the user in the database
        const user = await User.findOne({ email: userEmail });

        // Create a new Order document
        const newOrder = new Order({
            orderID: orderID,
            items: user.cart,  // Save the current cart items as the order
            email: userEmail,
            paymentMethod: payment,
            orderStatus: "Pending"
        });

        // Save the new order in the Orders collection
        await newOrder.save();

        // Add the orderID to the user's orders array
        user.orders.push(orderID);

        // Clear the user's cart (optional, depending on your use case)
        user.cart = [];

        // Save the updated user document
        await user.save();

        // Redirect to the order confirmation page
        res.redirect('/');
    } catch (err) {
        console.error('Error processing order:', err);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router