import { postgresConnection as cn } from '../../config/helpers.js';
import { QueryFile } from 'pg-promise';
const pgp = require('pg-promise')();
const db = pgp(cn);

function sql(file) {
  return new QueryFile(__dirname + file, { minify: true });
}


// get user follows count for any user
export const getUserFollowCount = (request, response) => {
  console.log(request.params);
  // expects '''.user
  db.query(sql('/getUserFollowCount.sql'), request.params)
    .then(data => {response.json(data); return;})
    .catch(data => {response.json(data); return;})
};

// get recipe follows count for any recipe
export const getRecipeFollowCount = (request, response) => {
  console.log(request.params);
  // expects '''.recipe_id
  db.query(sql('/getRecipeFollowCount.sql'), request.params)
    .then(data => {response.json(data); return;})
    .catch(data => {response.json(data); return;})
};

// get user follows count and user follow status for logged in user
export const getUserFollowState = () => {};
// get recipe follows count and recipe follow status for logged in user
export const getRecipeFollowState = () => {};

// add new user follow for logged in user
export const addUserFollow = (request, response) => {};
// add new recipe follow for logged in user
export const addRecipeFollow = (request, response) => {};

// remove user follow for logged in user
export const removeUserFollow = (request, response) => {};
// remove recipe follow for logged in user
export const removeRecipeFollow = (request, response) => {};


// decide whether to add or remove user follow, based on user intent
export const addOrRemoveUserFollow = (request, response) => {};
// decide whether to add or remove recipe follow, based on user intent
export const addOrRemoveRecipeFollow = (request, response) => {};



