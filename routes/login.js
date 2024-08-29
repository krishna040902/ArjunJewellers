// routes/signup.js
const express = require('express');
const User = require('../models/user');
const { sendOrderConfirmationEmail } = require('./emailService');
const bcrypt = require('bcryptjs')
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).render('login', { user : req.session.isAuth, username : req.session.username})
});
// router.post('/', async (req, res) => {
//     try {
//         const check = await User.findOne({ email: req.body.email })
//         if (check.password === req.body.password) {
//             res.send("login Successful")
//         }
//         else {
//             res.send("wrong password")
//         }
//     } catch (error) {
//         res.send(error)
//     }
// });
router.post('/', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email:email })
    if (!user){
        return res.redirect('/login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        return res.redirect('/login')
    }
    req.session.isAuth = true
    req.session.username = user.name
    req.session.useremail = user.email
    await sendOrderConfirmationEmail(req.session.useremail);
    res.redirect('/')
});

module.exports = router;
