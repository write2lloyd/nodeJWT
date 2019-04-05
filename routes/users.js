var express = require('express');
var router = express.Router();
const Product = require('../models/user');
const multer = require('multer');

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
    Product.find().exec()
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
    Product.findById(userid).exec()
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

router.put('/:userid', function(req, res, next) {
    const userid = req.params.userid
    Product.update({_id: userid}, {$set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        profileimage: req.body.profileimage,
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
    const product = new Product({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        profileimage: req.file.path,
        dob: req.body.dob
    });
    product.save()
        .then(result => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(error);
            res.status(500).send('An error occurred');
        })
    
});

router.delete('/:userid', function(req, res, next) {
    const userid = req.params.userid;
    Product.remove({_id: userid}).exec()
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => console.log(err))
});

module.exports = router;