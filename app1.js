const express = require("express");

const app = express();
const path = require("path");

const shopRouter = require('./routes/shop');

const hostname = '127.0.0.1';
const port = 80;

//const bodyParser = require('body-parser')

//MongoDb Connection, Schema and Model-Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ArjunJewellers', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are connected to the database.')
});
var schema = new mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    msg: String
}, {collection: 'ContactForm'});
var form = mongoose.model('ContactForm', schema);

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
app.use(express.urlencoded())

// ROUTING

// app.get('/',(req, res)=>{
//     res.status(200).send("This is home page")
// });

app.get('/',(req, res)=>{
    res.status(200).render('index')
});
// app.get('/shop',(req, res)=>{
//     res.status(200).render('shop')
// });
app.use('/shop', shopRouter);
app.get('/contact',(req, res)=>{
    res.status(200).render('contact')
});
app.post('/contact',(req, res)=>{
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
app.get('/about',(req, res)=>{
    res.status(200).render('about')
});
app.get('/isformsaved',(req, res)=>{
    res.status(200).render('isformsaved', {heading: "Success!", message: "Your data has been saved"})
});
app.get('/try',(req, res)=>{
    res.status(200).render('try3')
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