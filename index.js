"use strict"

const express = require('express');
const app = express();
var figlet = require('figlet');
var logger = require('morgan');
const timeout = 30000;

var users = require('./routes/users');

app.use(logger('dev'));

const PORT = 80;

var auth = require('./auth');
app.use(auth);

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

// TODO increasing to accomadate the current process
// Need to reduce this when refactoring
server.timeout = timeout;
