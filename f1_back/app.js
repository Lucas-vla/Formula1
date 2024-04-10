require('dotenv').config()
require('./models/connection')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/User');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')



const authRoutes = require('./routes/auth')

var app = express();

app.use(bodyParser.json())

// permet déviter les problèmes de CORS
app.use((req,res,next)=>{
    res.setHeader('Access-control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    next()
})

// Ensemble de route

app.use('/auth', authRoutes)

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then((result) => {
        if(result) {
            console.log('Server Found, and connected to ' + process.env.APP_PORT)
            app.listen(process.env.APP_PORT)
        }
    })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);


module.exports = app;
