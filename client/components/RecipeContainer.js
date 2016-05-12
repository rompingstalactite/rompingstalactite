import React from 'react';
import '../scss/_recipeContainer.scss';

import RecipeEntry from '../../client/components/RecipeEntry.js';

const RecipeContainer = (props) => {
  let childRecipes;
  if (!props.recipes || props.recipes.length === 0) {
    childRecipes = <p>No history available for this recipe yet.</p>;
  } else {
    childRecipes = props.recipes.map((recipe) => <RecipeEntry recipe={recipe} />);
  }
  return (
    <div className="recipe-container">
      <h2>{props.type}</h2>
      {childRecipes}
    </div>
  );
};

export default RecipeContainer;
