import { expect } from 'chai';
import request from 'supertest';

import app from '../../server/server.js';


describe('User APIv1 tests', () => {
  describe('client-server', () => {
    it('returns 200 on GET "/"', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });

    it('responds with a 201 (Created) when a valid user is sent', (done) => {
      const newUser = {
        username: `FakeUser ${Math.random()}`,
        createdAt: new Date(),
        avatar: 'nonsense',
      };

      request(app)
        .post('/api/v1/users')
        .send(newUser)
        .expect(201, done);
    });

    it('returns 403 forbidden on GET "/api/users/"', (done) => {
      request(app)
        .get('api/v1/users')
        .expect(403, done);
    });

  });

});
