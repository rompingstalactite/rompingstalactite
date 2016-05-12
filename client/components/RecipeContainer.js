import React from 'react';
import '../scss/_recipeContainer.scss';

import RecipeEntry from '../../client/components/RecipeEntry.js';

const RecipeContainer = (props) => (
  <div>
    <h2>{props.type}</h2>
    <div className="recipe-container">
      {props.recipes.map((recipe) => <RecipeEntry recipe={recipe} />)}
    </div>
  </div>
);

export default RecipeContainer;
