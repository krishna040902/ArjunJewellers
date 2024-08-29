const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findOne({ email: req.session.useremail });
  const items = user.cart;
  // Calculating total price
  let intPrice = 0; 
  items.forEach(item=>{
    const priceString = item.price
    intPrice += parseInt(priceString.replace(/\D/g, ''), 10);
  });

  res.render('cart', { user : req.session.isAuth, username : req.session.username, items, totalprice : intPrice });
});


router.post('/', async (req, res) => {
  const { item } = req.body;
  const userEmail = req.session.useremail;

  try {
    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.cart.push(item);
      await user.save();
      res.status(200).json({ message: 'Item added to cart successfully!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;