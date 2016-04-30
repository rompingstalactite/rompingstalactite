import React from 'react';

import RecipeEntry from '../../client/components/RecipeEntry.js';

const RecipeContainer = (props) => (
  <div className="recipe-container">
    {props.recipes.map((recipe) => <RecipeEntry recipe={recipe} />)}
  </div>
);

export default RecipeContainer;
