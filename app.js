require("dotenv").config();

const express = require("express");

const app = express();
const path = require("path");
const session = require('express-session')
const mongodbsession = require('connect-mongodb-session')(session)

const shopRouter = require('./routes/shop');
const contactRouter = require('./routes/contact');
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const cartRouter = require('./routes/cart')
const logoutRouter = require('./routes/logout')
const profileRouter = require('./routes/profile')
const checkoutRouter = require('./routes/checkout')

const User = require('./models/user')

const hostname = '127.0.0.1';
const port = process.env.PORT;

//const bodyParser = require('body-parser')

//MongoDb Connection, Schema and Model-Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are connected to the database.')
});

//FOR SERVING STATIC FILE EX. IMAGES
app.use('/static', express.static('static'))

// FOR USING PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*BODYPARSER IS USED FOR RETREIVING DATA FROM POST REQUEST.
BUT FOR EXPRESS VERS. > 4.16, THE BODYPARSER IS INBUILT
SO WE HAVE COMMENTED OUT BODYPARSER (LINE-39) AND ARE USING INBUILT BODY PARSER (LINE-40, 41)
*/

//app.use(bodyParser())
app.use(express.json());    //InBuilt BodyParser
app.use(express.urlencoded({ extended: true }))
const store = new mongodbsession({
    uri: 'mongodb://localhost/ArjunJewellers',
    collection: 'UserSessions'
})
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    store: store
}))

// ROUTING

app.get('/',(req, res)=>{
    res.status(200).render('index', { user : req.session.isAuth, username : req.session.username})
});
app.use('/shop', shopRouter);
app.use('/contact', contactRouter);
app.get('/about',(req, res)=>{
    res.status(200).render('about', { user : req.session.isAuth, username : req.session.username})
});
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/profile', profileRouter)
app.get('/isformsaved',(req, res)=>{
    res.status(200).render('isformsaved', {heading: "Success!", message: "Your data has been saved"})
});
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)
app.get('/try',(req, res)=>{
    res.status(200).render('try3')
});
app.post('/removefromcart', async (req, res)=>{
    const add = req.body.item.image_address;
    const userEmail = req.session.useremail;

    try {
        const user = await User.findOne({ email: userEmail });
        if (user) {
            const indexToRemove = user.cart.findIndex(item => item.image_address === add);
            if (indexToRemove !== -1) {
                // Remove the item from the cart array
                user.cart.splice(indexToRemove, 1);
                await user.save(); // Save the updated user document
                //return res.redirect('/cart');
                return res.status(200).json({ message: 'Item removed from cart successfully!' });
            }
        } else {
        return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error removing item from cart:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/try',(req, res)=>{
    var myData2 = new form(req.body);
    myData2.save().then(() => {
        res.send("This item has been saved")
    }).catch((err) => {
        res.send(`This item can not be saved: ${err}`)
    })
});
app.get('/index2',(req, res)=>{
    res.status(200).render("index2", {title:"Index",message:"Hello there, how are you doin'"})
});

//SERVER LISTENING

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });