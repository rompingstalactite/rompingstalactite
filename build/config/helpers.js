'use strict';

var devConnection = {
  host: process.env.DB_URL || 'localhost', // server name or IP address;
  user: process.env.DB_USER || 'admin',
  // password: process.env.DB_PASSWORD || undefined,
  port: 5432,
  database: 'recipes'
};
var prodConnection = process.env.DATABASE_URL;
var connection = process.env.NODE_ENV === 'production' ? prodConnection : devConnection;

module.exports = {
  postgresConnection: connection
};