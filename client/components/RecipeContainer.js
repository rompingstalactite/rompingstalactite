import React from 'react';

import RecipeEntry from '../../client/components/RecipeEntry.js';

const RecipeContainer = (props) => (
  <div className="recipe-container">
    <h1>{props.type}</h1>
    {props.recipes.map((recipe) => <RecipeEntry recipe={recipe} />)}
  </div>
);

export default RecipeContainer;
