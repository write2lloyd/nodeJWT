"use strict"
require('dotenv').config();
const express = require('express');
const app = express();
var figlet = require('figlet');
var logger = require('morgan');
const timeout = 30000;
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const dynamoose = require("dynamoose");

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

const ddb = new dynamoose.aws.sdk.DynamoDB({
    "accessKeyId": process.env.accessKeyId,
    "secretAccessKey": process.env.secretAccessKey,
    "region": process.env.region
});
dynamoose.aws.ddb.set(ddb);

server.timeout = timeout;
