import Promise from 'bluebird';
import Stubs from './Stubs.js';
const expect = require('chai').expect;
import fakeRecipe from '../components/fakeRecipe';
import {
  fetchRecipe,
  createRecipe,
  forkRecipe,
  fetchCurrentUser,
  fetchRecipesLiked,
  fetchRecipesCreated,
} from '../../client/utils/utils';

const copyRecipe = (recipe) => {
  const recipeCopy = {};
  Object.keys(recipe).forEach((k) => {
    if (k !== 'id' && k !== 'created_at' && k !== 'updated_at') {
      recipeCopy[k] = recipe[k];
    }
  });
  return recipeCopy;
}

/** Create a version of the 'fetch' function that just returns the requested
* value (for testing purposes only).
*/
const useModifiedFetch = (functionThatUsesFetch) => {
  const modifiedFetch = (url, options, callback) => {
    // createRecipe / forkRecipe
    if (url.indexOf('/api/v1/recipes/') > -1  && options.method === 'POST') {
      const recipe = JSON.parse(options.body);
      const response = new Stubs.response();
      response.json(recipe);
      return callback(null, response);

    // fetchRecipe / forkRecipe
    } else if (url.indexOf('/api/v1/recipes/1') > -1 && options.method === 'GET') {
      const recipe = {
        id: 1,
        title: 'Vegan Red Velvet Cupcakes',
        parent: null,
      }
      const response = new Stubs.response();
      response.json(recipe);
      return callback(null, response);

    // fetchCurrentUser
    } else if (url.indexOf('/api/v1/user/') > -1 && (options.method === undefined || options.method === 'GET')) {
      const user = {
        id: null,
        displayName: null,
        photos: [{ value: 'http://www.carderator.com/assets/avatar_placeholder_small.png' }],
        gender: null,
        provider: null,
      };
      const response = new Stubs.response();
      response.json(user);
      return callback(null, response);

    // fetchRecipesLiked
  } else if (url.indexOf('/api/v1/likes/1') > -1 && (options.method === undefined || options.method === 'GET')) {
      const recipes = [{
        id: 1,
        title: 'Vegan Red Velvet Cupcakes',
        parent: null,
        recipe_id: 2,
        user_id: 1,
      }];

      const response = new Stubs.response();
      response.json(recipes);
      return callback(null, response);

    // fetchRecipesCreated
    } else if (url.indexOf('/api/v1/created/1') > -1 && (options.method === undefined || options.method === 'GET')) {
      const recipes = [{
        id: 3,
        title: 'Steak',
        parent: null,
        author: 1,
      }];

      const response = new Stubs.response();
      response.json(recipes);
      return callback(null, response);
    } else {
      return callback(new Error('Didn\'t recognize the request being tested.'));
    }
  };

  // Promisify the function created above
  fetch = (url, options) => {
    return new Promise(function(resolve, reject) {
      modifiedFetch(url, options, function(err, content) {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  };

  return functionThatUsesFetch;
};

describe('Util tests', () => {
  it('should create a new recipe', (done) => {
    const cb = (createdRecipe) => {
      expect(createdRecipe).to.not.be.undefined;
      expect(createdRecipe.title).to.equal('Vegan Red Velvet Cupcakes');
      done();
    };
    useModifiedFetch(createRecipe)(copyRecipe(fakeRecipe), cb);
  });

  it('should fetch an existing recipe', (done) => {
    const cb = (recipe) => {
      expect(recipe).to.not.be.undefined;
      expect(recipe.title).to.equal('Vegan Red Velvet Cupcakes');
      done();
    };
    useModifiedFetch(fetchRecipe)(1, cb);
  });

  it('should fetch the current user', (done) => {
    const cb = (user) => {
      expect(user).to.not.be.undefined;
      expect(user.photos[0].value).to.equal('http://www.carderator.com/assets/avatar_placeholder_small.png');
      done();
    };
    useModifiedFetch(fetchCurrentUser)(cb);
  });

  it('should fork a recipe', (done) => {
    const originalRecipeID = 1;
    const userID = 1337;
    const cb = (recipe) => {
      expect(recipe).to.not.be.undefined;
      expect(recipe.parent).to.equal(originalRecipeID);
      expect(recipe.author).to.equal(userID);
      expect(recipe.title).to.equal('Vegan Red Velvet Cupcakes');
      done();
    };
    useModifiedFetch(forkRecipe)(originalRecipeID, userID, cb);
  });

  it('should fetch a user\'s liked recipes', (done) => {
    const userID = 1;
    const cb = (recipes) => {
      expect(recipes).to.not.be.undefined;
      expect(Array.isArray(recipes)).to.be.true;
      expect(recipes[0].user_id).to.be.equal(userID);
      done();
    };
    useModifiedFetch(fetchRecipesLiked)(userID, cb);
  });

  it('should fetch a user\'s created recipes', (done) => {
    const userID = 1;
    const cb = (recipes) => {
      expect(recipes).to.not.be.undefined;
      expect(Array.isArray(recipes)).to.be.true;
      expect(recipes[0].author).to.be.equal(userID);
      done();
    };
    useModifiedFetch(fetchRecipesCreated)(userID, cb);
  });
});
