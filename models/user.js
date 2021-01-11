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

module.exports = dynamoose.model('Users', schema);