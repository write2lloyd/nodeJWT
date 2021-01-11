const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
    "userid": String,
    "username": String,
    "password": String,
    "email": String
}, {
    "saveUnknown": true,
    "timestamps": true
});



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const schema = new Schema({
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     mobile: { type: String, required: true },
//     profileimage: { type: String, required: true },
//     dob: { type: Date, default: Date.now }
// });

// schema.set('toJSON', { virtuals: true });

module.exports = dynamoose.model('Users', schema);