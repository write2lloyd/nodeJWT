const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    getAllUsers: function(req, res, next) {
        User.find().exec()
        .then(users => {
            console.log(users.length);
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(500).send(err);
        })
    },
    getUser: function(req, res, next) {
        const userid = req.params.userid;
        User.findById(userid).exec()
        .then(user => {
            console.log(user);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(400).send('User not found');
            } 
        })
        .catch(err => {
            res.status(500).send(err);
        })
    },
    addUser: function(req, res, next) {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            profileimage: req.file.path,
            dob: req.body.dob
        });
        user.save()
            .then(result => {
                console.log(result);
                const token = jwt.sign({
                    id: result._id
                }, config.jwt.secret,{
                    expiresIn: "1h"
                });
                res.status(200).json({
                    result: result,
                    token: token
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('An error occurred');
            })
    },
    updateUser: function(req, res, next) {
        const userid = req.params.userid
        User.update({_id: userid}, {$set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            profileimage: req.file.path,
            dob: req.body.dob
        }}).exec().
        then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(500).send(error);
        })
    },
    deleteUser: function(req, res, next) {
        const userid = req.params.userid;
        User.remove({_id: userid}).exec()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => console.log(err))
    }
}