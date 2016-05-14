import { expect } from 'chai';
import request from 'supertest';

import app from '../../server/server.js';


describe('APIv1 Tests', () => {
  describe('/', () => {
    it('should send status code 200 for GET', (done) => {
      request(app).get('/').expect(200, done);
    });

    it('should send status code 404 for POST', (done) => {
      request(app).post('/').expect(404, done);
    });

    it('should send status code 404 for PUT', (done) => {
      request(app).put('/').expect(404, done);
    });

    it('should send status code 404 for DELETE', (done) => {
      request(app).delete('/').expect(404, done);
    });
  });

  describe('/api/v1/user', () => {
    describe('without session info', () => {
      it('should send status code 200 for GET', (done) => {
        request(app).get('/api/v1/user').expect(200, done);
      });

      it('should send an empty user object for GET', (done) => {
        const emptyUserObject = {"id":null,"displayName":null,"photos":[{"value":"http://www.carderator.com/assets/avatar_placeholder_small.png"}],"gender":null,"provider":null};
        request(app).get('/api/v1/user').expect(200, emptyUserObject, done);
      });

      it('should send status code 404 for POST', (done) => {
        request(app).post('/api/v1/user').expect(404, done);
      });

      it('should send status code 404 for PUT', (done) => {
        request(app).put('/api/v1/user').expect(404, done);
      });

      it('should send status code 404 for DELETE', (done) => {
        request(app).delete('/api/v1/user').expect(404, done);
      });
    });

    // TODO: needs mock session info:
    // cf. http://stackoverflow.com/a/14001892
    // user1 = request.agent();
    xdescribe('with session info', () => {
      it('should send status code 200 for GET', (done) => {
        // const realUser = {};
        request(app).get('/api/v1/user').expect(200, realUser, done);
      });

      it('should send status code 404 for POST', (done) => {
        // user creation should happen on /api/v1/users/ << plural users
        request(app).post('/api/v1/user/').send({ fakeUser: 'fakeData' }).expect(404, done);
      });

      it('should send status code 404 for PUT', (done) => {
        request(app).put('/api/v1/user').expect(404, done);
      });

      it('should send status code 404 for DELETE', (done) => {
        request(app).delete('/api/v1/user').expect(404, done);
      });
    });
  });

  describe('/api/v1/users', () => {
      const newUser = {
        username: `FakeUser ${Math.random()}`,
        createdAt: new Date(),
        avatar: 'nonsense',
      };

    it('should send status code 200 for GET', (done) => {
      request(app).get('/api/v1/users').expect(200, done);
    });

    // TODO: needs mock session info:
    xit('should send status code 201 for POST with data', (done) => {
      request(app).post('/api/v1/users').send(newUser).expect(302, done);
    });

    // TODO: needs mock session info:
    xit('should send status code ?? for POST without data', (done) => {
      request(app).post('/api/v1/users').expect('??', done);
    });

    it('should send status code 404 for PUT', (done) => {
      request(app).put('/api/v1/users').expect(404, done);
    });

    it('should send status code 404 for DELETE', (done) => {
      request(app).delete('/api/v1/users').expect(404, done);
    });
  });

  describe('/api/v1/recipes', () => {
    it('should send status code 200 for GET', (done) => {
      request(app).get('/api/v1/recipes').expect(200, done);
    });

    xit('should send status code 404 for POST', (done) => {
      request(app).post('/api/v1/recipes').expect(404, done);
    });

    it('should send status code 404 for PUT', (done) => {
      request(app).put('/api/v1/recipes').expect(404, done);
    });

    it('should send status code 404 for DELETE', (done) => {
      request(app).delete('/api/v1/recipes').expect(404, done);
    });
    });

  xdescribe('/api/v1/likes', () => {
    it('should send status code 200 for GET', (done) => {
      request(app).get('/api/v1/likes').expect(200, done);
    });

    it('should send status code 404 for POST', (done) => {
      request(app).post('/api/v1/likes').expect(404, done);
    });

    it('should send status code 404 for PUT', (done) => {
      request(app).put('/api/v1/likes').expect(404, done);
    });

    it('should send status code 404 for DELETE', (done) => {
      request(app).delete('/api/v1/likes').expect(404, done);
    });
    });

  xdescribe('/api/v1/follows', () => {
    it('should send status code 200 for GET', (done) => {
      request(app).get('/api/v1/follows').expect(200, done);
    });

    it('should send status code 404 for POST', (done) => {
      request(app).post('/api/v1/follows').expect(404, done);
    });

    it('should send status code 404 for PUT', (done) => {
      request(app).put('/api/v1/follows').expect(404, done);
    });

    it('should send status code 404 for DELETE', (done) => {
      request(app).delete('/api/v1/follows').expect(404, done);
    });
  });

});
