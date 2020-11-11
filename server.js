if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const bodyParser   = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const companiesRouter = require('./routes/companies')
const studentsRouter = require('./routes/students')

app.use('/companies',companiesRouter)
app.use('/students',studentsRouter) 

app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))


mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))
  
app.listen(process.env.PORT || 3000) 
