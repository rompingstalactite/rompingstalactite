import { postgresConnection as cn } from '../../config/helpers.js';
import { QueryFile } from 'pg-promise';
const pgp = require('pg-promise')();
const db = pgp(cn);

function sql(file) {
  return new QueryFile(`${__dirname}/${file}`, { minify: true });
}

// get user follows count and user follow status for logged in user
// HTTP GET
export const getUserFollowState = (request, response) => {
  console.log(request.query);
  // in query: .userID, .targetID
  // or in body: .userID, .targetID
  db.query(sql('getUserFollowState.sql'), request.query || request.body)
    .then(data => { response.json(data); })
    .catch(error => { response.json(error); });
};

// get recipe follows count and recipe follow status for logged in user
// HTTP GET
export const getRecipeFollowState = (request, response) => {
  // in query: .userID, .targetID
  // or in body: .userID, .targetID
  const queryObj = {
    userID: request.query.userID || request.body.userID,
    targetID: request.query.targetID || request.body.targetID,
  };
  console.log('query', request.query,' or body', request.body);
  console.log('queryobj', queryObj);

  db.query(sql('getRecipeFollowState.sql'), queryObj)
    .then(data => { response.json(data); })
    .catch(error => { response.json(error); });
};

// add new user follow for logged in user
// HTTP POST
const addUserFollow = (request, response) => {
  // TODO: does not verify that both users exist before
  //       inserting a new user follow
  console.log(request.body);
  // body: .userID, .targetID
  db.query(sql('addUserFollow.sql'), request.body)
    .then(data => { getUserFollowState(request, response); })
    .catch(error => { response.json(error); });
};

// add new recipe follow for logged in user
// HTTP POST
const addRecipeFollow = (request, response) => {
  // TODO: does not verify that a user or a recipe exists before
  //       inserting a new recipe follow
  // body: .user_id, .recipe_id
  const queryObj = {
    userID: request.query.userID || request.body.userID,
    targetID: request.query.targetID || request.body.targetID,
  };
  db.query(sql('addRecipeFollow.sql'), queryObj)
    .then(data => { getRecipeFollowState(request, response); })
    .catch(error => { response.json(error); });
};

// remove user follow for logged in user
const removeUserFollow = (request, response) => {
  console.log(request.query);
  // in query: .follower, .target
  // or in body: .userID, .targetID
  const queryObj = Object.keys(request.query).length !== 0 ? request.query : request.body;
  db.query(sql('removeUserFollow.sql'), queryObj)
    .then(data => { getUserFollowState(request, response); })
    .catch(error => { response.json(error); });
};

// remove recipe follow for logged in user
const removeRecipeFollow = (request, response) => {
  // in query: .user_id, .recipe_id
  // or in body: ., .targetID
  const queryObj = {
    userID: request.query.userID || request.body.userID,
    targetID: request.query.targetID || request.body.targetID,
  };
  db.query(sql('removeRecipeFollow.sql'), queryObj)
    .then(data => { getRecipeFollowState(request, response); })
    .catch(error => { response.json(error); });
};

// decide whether to add or remove user follow, based on user intent
export const addOrRemoveUserFollow = (request, response) => {
  if (request.query.followState) {
    removeUserFollow(request, response);
  } else {
    addUserFollow(request, response);
  }
};

// decide whether to add or remove recipe follow, based on user intent
export const addOrRemoveRecipeFollow = (request, response) => {
  if (request.body.toggleFollow) {
    removeRecipeFollow(request, response);
  } else {
    addRecipeFollow(request, response);
  }
};

// get a list of every user the current user follows
// HTTP GET
export const getAllFollowedUsers = (request, response) => {
  // TODO: pagination
  // in query: .user_id
  db.query(sql('getAllFollowedUsers.sql'), request.query)
    .then(data => { response.json(data); })
    .catch(error => { response.data(error); });
};

export const getAllFollowedRecipes = (request, response) => {
  // TODO: pagination
  // in query: .user_id
  db.query(sql('getAllFollowedRecipes.sql'), request.query)
    .then(data => { response.json(data); })
    .catch(error => { response.data(error); });
};
