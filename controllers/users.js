const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

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
    login: function(req, res, next) {
        User.find({ email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).send('Login Failed');
            }
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if (err) {
                    return res.status(401).send('Login Failed');
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        password: user[0].password
                    }, config.jwt.secret,{
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Login Success',
                        token: token
                    });
                } else {
                    return res.status(401).send('Login Failed');
                }
            });
        })
        .catch()
    },
    addUser: function(req, res, next) {
        User.find({email: req.body.email})
        .exec()
        .then(foundUser => {
            if (foundUser.length >= 1) {
                return res.status(409).send('Email already exists');
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        return res.status(500).send('Could not hash password');
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
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
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).send(error);
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