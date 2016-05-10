import path from 'path';
import uc from '../APIv1/users/userController.js';
import rc from '../APIv1/recipes/recipeController.js';
import sc from '../APIv1/search/searchController.js';
import { handleGoogleLogin, authenticateGoogleLogin, checkAuth } from './auth.js';

module.exports = (app, express) => {

  /**
  * Auth
  */
  app.get('/auth/google', handleGoogleLogin);

  app.get('/auth/google/callback', authenticateGoogleLogin,
    (req, res) => { res.redirect('/'); }
  );

  app.get('/auth/signout', (req, res) => {
    req.session.destroy(() => { res.redirect('/'); });
  });

  /**
   * Users
   */

  app.get('/api/v1/user/', uc.getLoggedInUser);

  app.post('/api/v1/users/', checkAuth, uc.createUser);
  app.get('/api/v1/users/:user_id', uc.getOneUser);

  // TODO: getAllUsers should be protected for only admins, eventually.
  app.get('/api/v1/users/', uc.getAllUsers);

  // app.get('/api/v1/users/me', /* auth, */ getCurrentUser);
  // app.put('/api/v1/users/:user_id', /* auth, */ updateUser);
  // app.get('/api/v1/users/followers/:user_id', findFollowers);

  /**
   * Recipes
   */
  app.post('/api/v1/recipes/', checkAuth, rc.createRecipe);
  // app.post('/api/v1/recipes/:recipe_id', /* auth, */ forkRecipe);
  app.get('/api/v1/recipes/:recipe_id', checkAuth, rc.getOneRecipe);
  app.get('/api/v1/recipes/', rc.getMultipleRecipes);


  app.get('/api/v1/recipes/:recipe_id', rc.getOneRecipe);
  app.post('/api/v1/recipes/fork', rc.forkRecipe);
  app.get('/api/v1/recipes/fork', rc.forkRecipe);

  // app.put('/api/v1/recipes/:recipe', /* auth, */ updateRecipe);
  // app.get('/api/v1/recipes/:user', /* auth, */ getUsersRecipes);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);

  /**
   * Favorites
   */
  // app.get('/api/v1/favorites/:user', /* auth, */ getUserFavorites);
  // app.get('/api/v1/favorites/:user/count', /* auth, */ getUserFavoritesCount);

  /**
   * Search
   */
  app.get('/api/v1/recipes/search/:q', sc.searchRecipes);

  /**
   * Catch unspecified routes
   */
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
  });
};
