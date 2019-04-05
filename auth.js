var auth = require('basic-auth');

var config = require('./config.js');

module.exports = function (request, response, next) {
  var user = auth(request);
  if (!user || user.name !== config.authUser || user.pass !== config.authPass) {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    return response.status(401).send("You are unathorised to use this API");
  }
  return next();
};