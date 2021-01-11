"use strict"

const express = require('express');
const app = express();
var figlet = require('figlet');
var logger = require('morgan');
const timeout = 30000;
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const dynamoose = require("dynamoose");
var config = require('./config.js');

var users = require('./routes/users');

app.use(logger('dev'));

const PORT = 3000;

var auth = require('./auth');
app.use('/uploads', express.static('uploads'));
app.use(auth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

var server = app.listen(process.env.PORT || PORT, function() {
    figlet('NodeJWT on ' + PORT, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            return;
        }
        console.log(data);
    });
});

// mongoose.connect(config.mongodb.connectionString, {useNewUrlParser: true})
//     .then(()=> console.log("MongoDB Connected"))
//     .catch(err => console.log(err))

// TODO increasing to accomadate the current process
// Need to reduce this when refactoring

const ddb = new dynamoose.aws.sdk.DynamoDB({
    "accessKeyId": "AKIAIUGHGKEO3OQ4HVUA",
    "secretAccessKey": "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",
    "region": "ap-south-1"
});
console.log('ddb', ddb);
dynamoose.aws.ddb.set(ddb);

server.timeout = timeout;
