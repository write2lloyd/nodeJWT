const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.jwtauth;
        console.log(token);
        const decoded = jwt.verify(token, config.jwt.secret);
        next()
    } catch (error) {
        return res.status(401).send('Authorisation failed');
    }

}