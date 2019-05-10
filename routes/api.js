const express = require("express");
const router = express.Router();
const Ninja = require('../models/ninja');
var nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'chill.bill@gmail.com',
        pass: 'chill#123'
    }
});

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'tahirdev.clix@gmail.com',
//         pass: 'd3v@t4h1r'
//     }
// });

var mailOptions = {
    from: 'chill.bill@gmail.com',
    to: 'mittal.karan60@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });



// get a ninjas from db
router.get('/ninjas', function (req, res, next) {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("+++++++++mail error++++++++++",error);
        } else {
            console.log('+=====================Email sent: ======================' + info.response);
        }
    });
    res.send({type: "GET"});

});
// add new a ninjas from db
router.post('/ninjas', function (req, res, next) {
    // console.log("==ninja req recieved to backend==>")

    Ninja.create(req.body)
        .then(function (ninja) {
            console.log("==send ninjs==>", ninja)
            res.send(ninja);
        })
        .catch(next)
    // var ninja = new Ninja(req.body);
    // ninja.save();

});
// update a ninjas from db
router.put('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(function () {
            Ninja.findOne({_id: req.params.id})
                .then(function (ninja) {
                res.send(ninja)
                })
        })

});
// delete a ninjas from db
router.delete('/ninjas/:id', function (req, res, next) {
    // console.log("delete request", req.params.id);
    Ninja.findByIdAndRemove({_id: req.params.id})
        .then(function (ninja) {
            res.send(ninja)

        })
    // res.send({type: "DELETE", ID: req.params.id});

});

module.exports = router;