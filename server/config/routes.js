// var linksController = require('../links/linkController.js');
// var userController = require('../users/userController.js');
// var helpers = require('./helpers.js'); // our custom middleware

module.exports = function(app, express) {
  app.get('/', function(req, res, next) {
    res.json({"totally": "working"});
    next();
  });
}
