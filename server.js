// Set up express
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

// Body parser
const MONGODB_URI = `mongodb+srv://url_member:3cVwtPLUEbzMO46I@cluster0.nr8aa.mongodb.net/url`;
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
const dashboard = require('./api/routes/dashboard')
// Use routes
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
app.use('/login', login)
app.use('/register', register)
app.use('/', url)
app.use('/dashboard', dashboard)
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
// Listen for the server at a port.
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('🚀 Connected');
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  })
