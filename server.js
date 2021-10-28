// Set up express
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const db = require('./api/db/connection')

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Use .env files in local setup
!process.env.NODE_ENV ? require('dotenv').config() : console.log('DEV:PROD')

//Add Headers
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
    next();
});

// Import routes
const login = require('./api/routes/login')
const register = require('./api/routes/register')
const url = require('./api/routes/url')
// Use routes
app.use('/login', login)
app.use('/register', register)
app.use('/', url)
// Listen for the server at a port.
mongoose
  .connect('mongodb+srv://url_member:3cVwtPLUEbzMO46I@cluster0.nr8aa.mongodb.net/urls?retryWrites=true&w=majority')
  .then(result => {
    console.log('🚀 Connected');
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  })
