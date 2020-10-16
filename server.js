require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose"); 
const bodyParser   = require('body-parser');

const companiesRouter = require('./routes/companies')
const studentsRouter = require('./routes/students')

app.use('/companies',companiesRouter)
app.use('/students',studentsRouter) 

mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('../REST-API/routes/router');
routes(app);

app.listen(process.env.PORT || 3000) 
