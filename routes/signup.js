// routes/signup.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res)=>{
    res.status(200).render('signup')
});
router.post('/', async (req, res)=>{
    var myData = new User(req.body)
    myData.save().then(() => {
        res.redirect('/');
    }).catch((err) => {
        res.send(`This item can not be saved: ${err}`)
    })
});

module.exports = router;
