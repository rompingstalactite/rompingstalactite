import React from 'react';
import '../scss/_recipeEntry.scss';

const RecipeEntry = (props) => (
  <div className="recipe-entry">
    <img className="recipe-image" src={props.recipe.image} />
    <p className="recipe-title" >{props.recipe.title}</p>
  </div>
);

export default RecipeEntry;
