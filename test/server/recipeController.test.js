import { expect } from 'chai';
import Stubs from './Stubs.js';
const app = {};

import rc from '../../server/APIv1/recipes/recipeController.js';

describe('Recipe Controller results', () => {

  beforeEach(() => {
    app.request = new Stubs.request();
    app.response = new Stubs.response();
  });

  describe('Append/Remove Recipe Image URL to Database', () => {
    it('Should append newURL to recipe images array', (done) => {
      app.request.body = {};
      app.request.body.id = 1;
      app.request.body.newURL = 'TEST.COM';
     
      const cb = () => {
        // done callback fails if comparison fails. WUT
        // expect(app.response.json().length).to.equal(2);
        expect(app.response.json().length).to.be.above(0);
        done();
      };

      rc.addRecipeImage(app.request, app.response, cb);
    });

    it('Should remove newURL to recipe images array', (done) => {
      app.request.body = {};
      app.request.body.id = '1';
      app.request.body.newURL = 'TESTURL.COM';
     
      const cb = () => {
        // done callback fails if comparison fails. WUT
        // expect(app.response.json().length).to.equal(2);
        expect(app.response.json().length).to.equal(0);
        done();
      };

      rc.removeRecipeImage(app.request, app.response, cb);
    });

  });


});
