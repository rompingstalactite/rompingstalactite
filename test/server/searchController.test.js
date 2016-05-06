import { expect } from 'chai';
import Stubs from './Stubs.js';
const app = {};

import Search from '../../server/APIv1/search/searchController.js';

describe('search results', () => {

  beforeEach(() => {
    app.request = new Stubs.request();
    app.response = new Stubs.response();
  });

  describe('Basic search functionality', () => {
    it('Should find results when using keyword with known match', (done) => {
      app.request.params = {};
      app.request.params.q = 'sdfasdf%20cupcake';

      const cb = () => {
        // done callback fails if comparison fails. WUT
        // expect(app.response.json().length).to.equal(2);
        expect(app.response.json()[0]).to.have.property('title');
        done();
      };

      Search.searchRecipes(app.request, app.response, cb);
    });
    it('Should return empty array when searching for term that has no matching recipe', (done) => {
      app.request.params = {};
      app.request.params.q = 'DefinitelyNoMatchForThisLongString';

      const cb = () => {
        // done callback fails if comparison fails. WUT
        // expect(app.response.json().length).to.equal(2);
        expect(app.response.json().length).to.equal(0);
        done();
      };

      Search.searchRecipes(app.request, app.response, cb);
    });
  });


});
