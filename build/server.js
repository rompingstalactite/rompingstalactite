'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('./config/middleware.js');

var _middleware2 = _interopRequireDefault(_middleware);

var _routes = require('./config/routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Environment variables
 *
 * dev port: 8080, gulp port: 9090
*/
var PORT = process.env.PORT || 8080;

/**
 * Initialize express
 */


var app = (0, _express2.default)();
(0, _middleware2.default)(app, _express2.default);
(0, _routes2.default)(app, _express2.default);

console.log('Server listening on port: ' + PORT);

// prevent server from running twice in tests
if (!module.parent) {
  app.listen(PORT);
}

// export app to make it available for consuption, esp by tests
module.exports = app;