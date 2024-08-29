// routes/shop.js
const express = require('express');
const form = require('../models/contactForm');

const router = express.Router();

router.get('/', async (req, res)=>{
    res.status(200).render('contact', { user : req.session.isAuth, username : req.session.username})
});
router.post('/', async (req, res)=>{
    var myData = new form(req.body)
    myData.save().then(() => {
        //res.send('Form has been saved to the database!')
        res.render('isformsaved', {title: "Form saved", heading: "Success!", message: "Your data has been saved"});
    }).catch((err) => {
        // res.send(`This item can not be saved: ${err}`)
        //res.send("You already exist in our database!")
        res.render('isformsaved', {title: "Form not saved", heading: "Failed!", message: "You already exist in our database"});
    })
});

module.exports = router;
