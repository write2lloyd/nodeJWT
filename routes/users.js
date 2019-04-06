var express = require('express');
var router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const config = require('../config');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, req.body.firstname + '_' + file.originalname);
    }
});

const upload = multer({storage: storage});



router.get('/', function(req, res, next) {
    User.find().exec()
    .then(users => {
        console.log(users.length);
        res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).send(err);
    })
});

router.get('/:userid', function(req, res, next) {
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
});

router.put('/:userid', upload.single('displaimage'), checkAuth, function(req, res, next) {
    console.log(req.file);
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
});

router.post('/', upload.single('displayimage'), function(req, res, next) {
    console.log(req.file);
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
            console.log(error);
            res.status(500).send('An error occurred');
        })
    
});

router.delete('/:userid', checkAuth, function(req, res, next) {
    const userid = req.params.userid;
    User.remove({_id: userid}).exec()
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => console.log(err))
});

module.exports = router;