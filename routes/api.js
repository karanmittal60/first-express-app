const express = require("express");
const router = express.Router();
const Ninja = require('../models/ninja')


// get a ninjas from db
router.get('/ninjas', function (req, res, next) {
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