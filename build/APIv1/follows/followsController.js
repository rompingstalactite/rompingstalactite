'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllFollowedRecipes = exports.getAllFollowedUsers = exports.addOrRemoveRecipeFollow = exports.addOrRemoveUserFollow = exports.getRecipeFollowState = exports.getUserFollowState = undefined;

var _helpers = require('../../config/helpers.js');

var _pgPromise = require('pg-promise');

var pgp = require('pg-promise')();
var db = pgp(_helpers.postgresConnection);

function sql(file) {
  return new _pgPromise.QueryFile(__dirname + '/' + file, { minify: true });
}

// get user follows count and user follow status for logged in user
// HTTP GET
var getUserFollowState = exports.getUserFollowState = function getUserFollowState(request, response) {
  console.log(request.query);
  // in query: .userID, .targetID
  // or in body: .userID, .targetID
  db.query(sql('getUserFollowState.sql'), request.query || request.body).then(function (data) {
    response.json(data);
  }).catch(function (error) {
    response.json(error);
  });
};

// get recipe follows count and recipe follow status for logged in user
// HTTP GET
var getRecipeFollowState = exports.getRecipeFollowState = function getRecipeFollowState(request, response) {
  // in query: .userID, .targetID
  // or in body: .userID, .targetID
  var queryObj = {
    userID: request.query.userID || request.body.userID,
    targetID: request.query.targetID || request.body.targetID
  };
  console.log('query', request.query, ' or body', request.body);
  console.log('queryobj', queryObj);

  db.query(sql('getRecipeFollowState.sql'), queryObj).then(function (data) {
    response.json(data);
  }).catch(function (error) {
    response.json(error);
  });
};

// add new user follow for logged in user
// HTTP POST
var addUserFollow = function addUserFollow(request, response) {
  // TODO: does not verify that both users exist before
  //       inserting a new user follow
  console.log(request.body);
  // body: .userID, .targetID
  db.query(sql('addUserFollow.sql'), request.body).then(function (data) {
    getUserFollowState(request, response);
  }).catch(function (error) {
    response.json(error);
  });
};

// add new recipe follow for logged in user
// HTTP POST
var addRecipeFollow = function addRecipeFollow(request, response) {
  // TODO: does not verify that a user or a recipe exists before
  //       inserting a new recipe follow
  // body: .user_id, .recipe_id
  var queryObj = {
    userID: request.query.userID || request.body.userID,
    targetID: request.query.targetID || request.body.targetID
  };
  db.query(sql('addRecipeFollow.sql'), queryObj).then(function (data) {
    getRecipeFollowState(request, response);
  }).catch(function (error) {
    response.json(error);
  });
};

// remove user follow for logged in user
var removeUserFollow = function removeUserFollow(request, response) {
  console.log(request.query);
  // in query: .follower, .target
  // or in body: .userID, .targetID
  var queryObj = Object.keys(request.query).length !== 0 ? request.query : request.body;
  db.query(sql('removeUserFollow.sql'), queryObj).then(function (data) {
    getUserFollowState(request, response);
  }).catch(function (error) {
    response.json(error);
  });
};

// remove recipe follow for logged in user
var removeRecipeFollow = function removeRecipeFollow(request, response) {
  // in query: .user_id, .recipe_id
  // or in body: ., .targetID
  var queryObj = {
    userID: request.query.userID || request.body.userID,
    targetID: request.query.targetID || request.body.targetID
  };
  db.query(sql('removeRecipeFollow.sql'), queryObj).then(function (data) {
    getRecipeFollowState(request, response);
  }).catch(function (error) {
    response.json(error);
  });
};

// decide whether to add or remove user follow, based on user intent
var addOrRemoveUserFollow = exports.addOrRemoveUserFollow = function addOrRemoveUserFollow(request, response) {
  if (request.query.followState) {
    removeUserFollow(request, response);
  } else {
    addUserFollow(request, response);
  }
};

// decide whether to add or remove recipe follow, based on user intent
var addOrRemoveRecipeFollow = exports.addOrRemoveRecipeFollow = function addOrRemoveRecipeFollow(request, response) {
  if (request.body.toggleFollow) {
    removeRecipeFollow(request, response);
  } else {
    addRecipeFollow(request, response);
  }
};

// get a list of every user the current user follows
// HTTP GET
var getAllFollowedUsers = exports.getAllFollowedUsers = function getAllFollowedUsers(request, response) {
  // TODO: pagination
  // in query: .user_id
  db.query(sql('getAllFollowedUsers.sql'), request.query).then(function (data) {
    response.json(data);
  }).catch(function (error) {
    response.data(error);
  });
};

var getAllFollowedRecipes = exports.getAllFollowedRecipes = function getAllFollowedRecipes(request, response) {
  // TODO: pagination
  // in query: .user_id
  db.query(sql('getAllFollowedRecipes.sql'), request.query).then(function (data) {
    response.json(data);
  }).catch(function (error) {
    response.data(error);
  });
};