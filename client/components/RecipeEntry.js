import React from 'react';

const RecipeEntry = (props) => (
  <div className="recipe-entry">
    <p className="recipe-name" >{props.recipe.name}</p>
  </div>
);

export default RecipeEntry;
