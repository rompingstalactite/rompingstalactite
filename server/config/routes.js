import uc from '../APIv1/users/userController.js';

module.exports = (app, express) => {
  app.post('/api/v1/users/', /* auth, */ uc.createUser);
  app.get('/api/v1/users/:user_id', uc.getOneUser);
};
