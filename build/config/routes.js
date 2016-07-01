'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _userController = require('../APIv1/users/userController.js');

var _userController2 = _interopRequireDefault(_userController);

var _recipeController = require('../APIv1/recipes/recipeController.js');

var _recipeController2 = _interopRequireDefault(_recipeController);

var _searchController = require('../APIv1/search/searchController.js');

var _searchController2 = _interopRequireDefault(_searchController);

var _auth = require('./auth.js');

var _likesController = require('../APIv1/likes/likesController.js');

var _likesController2 = _interopRequireDefault(_likesController);

var _getFPKey = require('../keys/getFPKey.js');

var _getFPKey2 = _interopRequireDefault(_getFPKey);

var _followsController = require('../APIv1/follows/followsController.js');

var fc = _interopRequireWildcard(_followsController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, express) {

  /**
  * Auth
  */
  app.get('/auth/google', _auth.handleGoogleLogin);

  app.get('/auth/google/callback', _auth.authenticateGoogleLogin, function (req, res) {
    res.redirect('/dashboard');
  });

  app.get('/auth/signout', function (req, res) {
    req.session.destroy(function () {
      res.redirect('/');
    });
  });

  /**
   * Users
   */
  app.get('/api/v1/user', _userController2.default.getLoggedInUser); // getLoggedInUser

  app.get('/api/v1/users/', _userController2.default.getMultipleUsers);
  app.post('/api/v1/users/', _auth.checkAuth, _userController2.default.createUser);

  app.get('/api/v1/users/:user_id', _userController2.default.getOneUser);

  /**
   * Recipes
   */

  app.post('/api/v1/recipes/', _auth.checkAuth, _recipeController2.default.createRecipe);
  app.put('/api/v1/recipes/', _recipeController2.default.editRecipe);
  // app.post('/api/v1/recipes/:recipe_id', /* auth, */ forkRecipe);

  app.get('/api/v1/recipes/', _recipeController2.default.getMultipleRecipes);

  app.get('/api/v1/recipes/:recipe_id', _recipeController2.default.getOneRecipe);
  // app.post('/api/v1/recipes/:recipe_id', /* auth, */ forkRecipe);

  // app.put('/api/v1/recipes/:recipe', /* auth, */ updateRecipe);
  // app.get('/api/v1/recipes/:user', /* auth, */ getUsersRecipes);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);
  /**
   * Trending
   */
  app.get('/api/v1/trending', _recipeController2.default.trendingRecipes);
  // app.get('/api/v1/recipes/trending', rc.trendingRecipes);
  /**
   * Created
   */

  app.get('/api/v1/created/:user', _recipeController2.default.getAllCreatedRecipes);
  // app.get('api/v1/users/:users_id/recipes')
  // app.get('api/v1/recipes/author/:user_id')
  /**
   * Search
   */
  app.get('/api/v1/search/:q', _searchController2.default.searchRecipes);
  // add query string to get /recipes
  /**
   * Likes
   */
  app.get('/api/v1/likes', _likesController2.default.getLikeState);
  // always have the main endpoint be the resource that you're modifying - /recipes/:r_id/likes
  app.post('/api/v1/likes', _auth.checkAuth, _likesController2.default.addOrDeleteRecipeLike);
  // put? toggle?
  app.get('/api/v1/likes/:user', _likesController2.default.getAllLikedRecipes);
  // recipes/likes
  /**
  * FPKey
  */
  app.get('/api/v1/FPKey', _getFPKey2.default.getFPKey);

  /**
   * Follows
   */
  // need to specify that the parent endpoint ../follows/ is not a real endpoint
  app.get('/api/v1/follows/', function (req, res) {
    res.status(403);res.send('forbidden');
  });

  app.get('/api/v1/follows/users', fc.getUserFollowState);
  app.post('/api/v1/follows/users', _auth.checkAuth, fc.addOrRemoveUserFollow);
  app.get('/api/v1/follows/users/:user', /* checkAuth,*/fc.getAllFollowedUsers);

  app.get('/api/v1/follows/recipes', fc.getRecipeFollowState);
  // 'api/v1/recipes/:recipe_id/follows'
  app.post('/api/v1/follows/recipes', _auth.checkAuth, fc.addOrRemoveRecipeFollow);
  // 'api/v1/recipes/:recipe_id/follows/:follower_id' post and delete
  app.get('/api/v1/follows/recipes/:user', /* checkAuth,*/fc.getAllFollowedRecipes);

  /**
   * Catch unspecified routes
   */
  app.get('*', function (request, response) {
    response.sendFile(_path2.default.resolve(__dirname, '../../client', 'index.html'));
  });
};