import { expect } from 'chai';
import Stubs from './Stubs.js';
const app = {};

import Users from '../../server/APIv1/users/userController.js';

describe('User APIv1 tests', () => {

  beforeEach(() => {
    app.request = new Stubs.request();
    app.response = new Stubs.response();
    app.existingUser = {
      username: 'FakeUser',
      createdAt: new Date(),
      avatar: 'none',
    };
  });

    describe('CRUD on users', () => {
      it('Should create a new user', (done) => {
      const user = {
        username: `FakeUser ${Math.random()}`,
        createdAt: new Date(),
            avatar: 'none',
        };

      app.request.json(user);

      const cb = () => {
        expect(app.response.json().username).to.equal(user.username);
        done();
        };

      Users.createUser(app.request, app.response, cb);
      });

    it('Should return 202 if a user with the same name is already in the database', (done) => {
      app.request.json(app.existingUser);
      const cb = () => {
        expect(app.response.status()).to.equal(202);
        done();
      };

      Users.createUser(app.request, app.response, cb);
      });
      it('Should get info for the current user');
      it('Should update the current user');
      it('Should delete a user');
    it('Should forbid getting all users from the database', (done) => {
      const cb = () => {
        expect(app.response.status()).to.equal(403);
        done();
      };

      Users.getAllUsers(app.request, app.response, cb);
    });

      it('Should not be able to access properties of other users');
    });

    describe('Following', () => {
      it('Should follow a user');
      it('Should unfollow a user');

      it('Should return a followers list');
    });
  });

});
