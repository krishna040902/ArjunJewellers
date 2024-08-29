const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/', async (req, res) => {
    const user = await User.findOne({ email:req.session.useremail })
    res.render('profile', 
        { user : req.session.isAuth, 
            username : req.session.username,
            mobile: user.mobile,
            email: user.email,
            address: user.address,
            cart: user.cart.length
        })
})

module.exports = router;