if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const bodyParser   = require('body-parser');
const companiesRouter = require('./routes/companies')
const studentsRouter = require('./routes/students')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use('/companies',companiesRouter)
app.use('/students',studentsRouter) 

mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))
  
app.listen(process.env.PORT || 3000) 
