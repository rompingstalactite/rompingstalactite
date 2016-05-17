import { recipeSeed } from './seedData';
import { createRecipe } from '../../client/utils/utils';

const dispStatus = (recipe) => {
  console.log('Creating recipe: ', recipe.title);
};

// Make sure to comment out auth middleware in routes.js before running
recipeSeed.forEach((recipe) => {
  createRecipe(recipe, dispStatus);
});
