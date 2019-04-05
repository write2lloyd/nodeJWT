var express = require('express');
var router = express.Router();
var config = require('../config.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongouser:mongouser@node-jwt-vayve.mongodb.net/test?retryWrites=true',{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});
router.get('/', function(req, res, next) {
    res.status(200).send('get all users');
});

router.get('/:userid', function(req, res, next) {
    res.status(200).send('get one user');
});

router.put('/:userid', function(req, res, next) {
    res.status(200).send('update user');
});

router.post('/', function(req, res, next) {
    res.status(200).send('insert user');
});

router.delete('/:userid', function(req, res, next) {
    res.status(200).send('delete user');
});

module.exports = router;