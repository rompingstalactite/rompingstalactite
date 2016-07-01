'use strict';

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;
var cookieParserSecret = process.env.COOKIE_PARSER_SECRET;

if (!process.env.TRAVIS && !process.env.HEROKU) {
  expressSessionSecret = require('../keys/expressSecrets').expressSecrets.EXPRESS_SESSION_SECRET;
  cookieParserSecret = require('../keys/expressSecrets').expressSecrets.COOKIE_PARSER_SECRET;
}

module.exports = function (app, express) {
  app.use((0, _morgan2.default)('combined'));
  app.use((0, _compression2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  app.use((0, _cookieParser2.default)(cookieParserSecret));
  app.use(_passport2.default.initialize());
  app.use((0, _expressSession2.default)({
    secret: expressSessionSecret,
    resave: true,
    saveUninitialized: true
  }));
  app.use(_passport2.default.session());
  app.use(express.static(__dirname + '/../../client'));
};