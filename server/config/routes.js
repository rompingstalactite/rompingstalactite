import path from 'path';
import uc from '../APIv1/users/userController.js';
import rc from '../APIv1/recipes/recipeController.js';
import sc from '../APIv1/search/searchController.js';

module.exports = (app, express) => {
  /**
   * Users
   */
  app.post('/api/v1/users/', /* auth, */ uc.createUser);
  app.get('/api/v1/users/:user_id', uc.getOneUser);

  // TODO: getAllUsers should be protected for only admins, eventually.
  app.get('/api/v1/users/', /* auth, */ uc.getAllUsers);

  // app.get('/api/v1/users/me', /* auth, */ getCurrentUser);
  // app.put('/api/v1/users/:user_id', /* auth, */ updateUser);
  // app.get('/api/v1/users/followers/:user_id', findFollowers);

  /**
   * Recipes
   */
  app.post('/api/v1/recipes/', /* auth, */ rc.createRecipe);
  // app.post('/api/v1/recipes/:recipe_id', /* auth, */ forkRecipe);
  app.get('/api/v1/recipes/:recipe_id', rc.getOneRecipe);
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
