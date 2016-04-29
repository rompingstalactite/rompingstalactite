/**
 * # Environment variables
 *
 * dev port: 8080, gulp port: 9090
*/
var PORT = process.env.PORT || 8080;

/**
 * Initialize express
 */
var express = require('express');
var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
console.log('Server listening on port: ' + PORT);
app.listen(PORT);
