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

  describe('server-database', () => {
    describe('CRUD on users', () => {
      it('Should create a new user', (done) => {
        app.request = {
          body: {
            username: `FakeUser ${Math.random() + new Date() }`,
            createdAt: '2016-05-01 01:00:02.313',
            avatar: 'none',
          },
        };
        app.response = {};
        app.next = (callback) => {
          callback();
        };

        User.createUser(app.request, app.response, app.next());
      });
      it('Should create a new user only if one with properties does not exist', (done) => {
        User.createUser(app.request, app.response, app.next(done));
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
