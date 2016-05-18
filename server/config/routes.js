import path from 'path';
import uc from '../APIv1/users/userController.js';
import rc from '../APIv1/recipes/recipeController.js';
import sc from '../APIv1/search/searchController.js';
import { handleGoogleLogin, authenticateGoogleLogin, checkAuth } from './auth.js';
import lc from '../APIv1/likes/likesController.js';
import fp from '../keys/getFPKey.js';
import * as fc from '../APIv1/follows/followsController.js';

module.exports = (app, express) => {

  /**
  * Auth
  */
  app.get('/auth/google', handleGoogleLogin);

  app.get('/auth/google/callback', authenticateGoogleLogin,
    (req, res) => { res.redirect('/dashboard'); }
  );

  app.get('/auth/signout', (req, res) => {
    req.session.destroy(() => { res.redirect('/'); });
  });

  /**
   * Users
   */
  app.get('/api/v1/user', uc.getLoggedInUser); // getLoggedInUser

  app.get('/api/v1/users/', uc.getMultipleUsers);
  app.post('/api/v1/users/', checkAuth, uc.createUser);

  app.get('/api/v1/users/:user_id', uc.getOneUser);

  /**
   * Recipes
   */

  app.post('/api/v1/recipes/', checkAuth, rc.createRecipe);
  app.put('/api/v1/recipes/', rc.editRecipe);
  // app.post('/api/v1/recipes/:recipe_id', /* auth, */ forkRecipe);

  app.get('/api/v1/recipes/', rc.getMultipleRecipes);
  app.post('/api/v1/recipes/', checkAuth, rc.createRecipe);

  app.get('/api/v1/recipes/:recipe_id', rc.getOneRecipe);
  // app.post('/api/v1/recipes/:recipe_id', /* auth, */ forkRecipe);

  // app.put('/api/v1/recipes/:recipe', /* auth, */ updateRecipe);
  // app.get('/api/v1/recipes/:user', /* auth, */ getUsersRecipes);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);
  /**
   * Trending
   */
  app.get('/api/v1/trending', rc.trendingRecipes);

  /**
   * Created
   */

  app.get('/api/v1/created/:user', rc.getAllCreatedRecipes);

  /**
   * Search
   */
  app.get('/api/v1/search/:q', sc.searchRecipes);

  /**
   * Likes
   */
  app.get('/api/v1/likes', lc.getLikeState);
  app.post('/api/v1/likes', checkAuth, lc.addOrDeleteRecipeLike);
  app.get('/api/v1/likes/:user', checkAuth, lc.getAllLikedRecipes);

   /**
   * FPKey
   */
  app.get('/api/v1/FPKey', fp.getFPKey);

  /**
   * Follows
   */
  // need to specify that the parent endpoint ../follows/ is not a real endpoint
  app.get('/api/v1/follows/', (req, res) => { res.status(403); res.send('forbidden'); });

  app.get('/api/v1/follows/users', fc.getUserFollowState);
  app.post('/api/v1/follows/users', /* checkAuth,*/ fc.addOrRemoveUserFollow);
  app.get('/api/v1/follows/users/:user', /* checkAuth,*/ fc.getAllFollowedUsers);

  app.get('/api/v1/follows/recipes', fc.getRecipeFollowState);
  app.post('/api/v1/follows/recipes', /* checkAuth,*/ fc.addOrRemoveRecipeFollow);
  app.get('/api/v1/follows/recipes/:user', /* checkAuth,*/ fc.getAllFollowedRecipes);

  /**
   * Catch unspecified routes
   */
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
  });
};
