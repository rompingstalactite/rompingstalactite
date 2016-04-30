/**
 * # Environment variables
 *
 * dev port: 8080, gulp port: 9090
*/
const PORT = process.env.PORT || 8080;

/**
 * Initialize express
 */
import express from 'express';
import middleware from './config/middleware.js';
import routes from './config/routes.js';


const app = express();
middleware(app, express);
routes(app, express);

console.log('Server listening on port: ' + PORT);
app.listen(PORT);
