import compress from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

let expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;
let cookieParserSecret = process.env.COOKIE_PARSER_SECRET;

if (!process.env.TRAVIS && !process.env.HEROKU) {
  expressSessionSecret = require('../keys/expressSecrets').expressSecrets.EXPRESS_SESSION_SECRET;
  cookieParserSecret = require('../keys/expressSecrets').expressSecrets.COOKIE_PARSER_SECRET;
}

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(compress());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser(cookieParserSecret));
  app.use(passport.initialize());
  app.use(session({
    secret: expressSessionSecret,
    resave: true,
    saveUninitialized: true,
  }));
  app.use(passport.session());
  app.use(express.static(`${__dirname}/../../client`));
};
