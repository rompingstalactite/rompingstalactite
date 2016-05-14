import { postgresConnection as cn } from '../../config/helpers.js';
import { QueryFile } from 'pg-promise';
const pgp = require('pg-promise')();
const db = pgp(cn);

function sql(file) {
  return new QueryFile(__dirname + "/" + file, { minify: true });
}


// get user follows count for any user
// UNUSED
// const getUserFollowCount = (request, response) => {
//   console.log(request.query);
//   // in query: .user
//   db.query(sql('getUserFollowCount.sql'), request.query)
//     .then(data => { response.json(data); })
//     .catch(data => { response.json(data); });
// };

// get recipe follows count for any recipe
// UNUSED
// const getRecipeFollowCount = (request, response) => {
//   console.log(request.query);
//   // in params: .recipe_id
//   db.query(sql('getRecipeFollowCount.sql'), request.params)
//     .then(data => { response.json(data); })
//     .catch(data => { response.json(data); });
// };

// get user follows count and user follow status for logged in user
// HTTP GET
export const getUserFollowState = (request, response) => {
  console.log(request.query);
  // in query: .follower, .target
  db.query(sql('getUserFollowState.sql'), request.query)
    .then(data => { response.json(data); })
    .catch(data => { response.json(data); });
};

// get recipe follows count and recipe follow status for logged in user
// HTTP GET
export const getRecipeFollowState = (request, response, next) => {
  console.log(request.query);
  // in query: .user_id, .recipe_id
  db.query(sql('getRecipeFollowState.sql'), request.query)
    .then(data => { response.json(data); })
    .catch(data => { response.json(data); });
};

// add new user follow for logged in user
// HTTP POST
export const addUserFollow = (request, response) => {
  // does not verify that both users exist before
  // inserting a new follow
  console.log(request.body);
  // body: .follower, .target
  db.query(sql('addUserFollow.sql'), request.body)
    .then(data => { response.json(data); })
    .catch(error => { response.json(error); });
};

// add new recipe follow for logged in user
export const addRecipeFollow = (request, response) => {};

// remove user follow for logged in user
export const removeUserFollow = (request, response) => {
  console.log(request.query)
  // in query: .follower, .target
  db.query(sql('removeUserFollow.sql'), request.query)
    .then(data => { response.json(data); })
    .catch(error => { response.json(error); });
};
// remove recipe follow for logged in user
export const removeRecipeFollow = (request, response) => {
  console.log(request.query)
  // in query: .user_id, .recipe_id
  db.query(sql('removeRecipeFollow.sql'), request.query)
    .then(data => { response.json(data); })
    .catch(error => { response.json(error); });
};


// decide whether to add or remove user follow, based on user intent
export const addOrRemoveUserFollow = (request, response) => {};
// decide whether to add or remove recipe follow, based on user intent
export const addOrRemoveRecipeFollow = (request, response) => {};



