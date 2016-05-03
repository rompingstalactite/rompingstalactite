import uc from '../APIv1/users/userController.js';

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
  // app.post('/api/v1/recipes/:recipe', /* auth, */ createRecipe);
  // app.get('/api/v1/recipes/:recipe', getOneRecipe);
  // app.put('/api/v1/recipes/:recipe', /* auth, */ updateRecipe);
  // app.get('/api/v1/recipes/:user', /* auth, */ getUsersRecipes);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);
  // app.get('/api/v1/recipes/me', /* auth, */ namedFn);

  /**
   * Favorites
   */
  // app.get('/api/v1/favorites/:user', /* auth, */ getUserFavorites);
  // app.get('/api/v1/favorites/:user/count', /* auth, */ getUserFavoritesCount);
};
