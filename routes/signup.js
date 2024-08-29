// routes/signup.js
const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res)=>{
    res.status(200).render('signup', { user : req.session.isAuth, username : req.session.username})
});
// router.post('/', async (req, res)=>{
//     var myData = new User(req.body)
//     myData.save().then(() => {
//         res.redirect('/');
//     }).catch((err) => {
//         res.send(`This item can not be saved: ${err}`)
//     })
// });
router.post('/', async (req, res)=>{
    const { name, mobile, email, address, password } = req.body
    const isUser = await User.findOne({ email: email })
    if (isUser) {
        return res.redirect('/signup')
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
        name,
        mobile,
        email,
        address,
        password: hashedPass
    })
    await user.save().then(()=>{
        res.redirect('/login')
    }).catch((err)=>{
        res.send(err)
    });
});

module.exports = router;
