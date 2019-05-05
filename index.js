const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// set up express
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/ninjago', {useNewUrlParser: true } );
// mongodb://localhost:27017/YourDB
mongoose.Promise = global.Promise;

//bodyparser setup
app.use(bodyParser.json());

//api routers0
app.use('/api',require('./routes/api'));

// error handling middleware
app.use(function (err, req, res, next) {
    // console.log("==err==",err)

    res.status(422).send({error: err.message})
})


//listern for app
app.listen(process.env.port || 4000,function () {
    console.log("listerning for request");
})