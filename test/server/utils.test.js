const expect = require('chai').expect;
import { fetchRecipe, createRecipe, forkRecipe } from '../../client/utils/utils';

import fakeRecipe from '../components/fakeRecipe';

const copyRecipe = (recipe) => {
  const recipeCopy = {};
  Object.keys(recipe).forEach((k) => {
    if (k !== 'id' && k !== 'created_at' && k !== 'updated_at') {
      recipeCopy[k] = recipe[k];
    }
  });
  return recipeCopy;
}

describe('Util tests', () => {
  it('should create a new recipe', (done) => {
    const cb = (createdRecipe) => {
      expect(createdRecipe).to.not.be.undefined;
      expect(createdRecipe.title).to.equal('Vegan Red Velvet Cupcakes');
      done();
    };
    createRecipe(copyRecipe(fakeRecipe), cb);
  });

  it('should fetch an existing recipe', (done) => {
    const cb = (recipe) => {
      expect(recipe).to.not.be.undefined;
      expect(recipe.title).to.equal('Vegan Red Velvet Cupcakes');
      done();
    };

    fetchRecipe(1, cb);
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

    forkRecipe(originalRecipeID, userID, cb);
  });
});
