// routes/signup.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).render('login')
});
router.post('/', async (req, res) => {
    try {
        const check = await User.findOne({ email: req.body.email })
        if (check.password === req.body.password) {
            res.send("login Successful")
        }
        else {
            res.send("wrong password")
        }
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
