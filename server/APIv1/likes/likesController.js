import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);
