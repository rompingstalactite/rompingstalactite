import React from 'react';
import '../scss/_recipeContainer.scss';

import RecipeEntry from '../../client/components/RecipeEntry.js';

const RecipeContainer = (props) => {
  let childRecipes;
  if (!props.recipes || props.recipes.length === 0) {
    childRecipes = <p>No recipes to show.</p>;
  } else {
    childRecipes = props.recipes.map((recipe) => <RecipeEntry recipe={recipe} />);
  }
  return (
    <div>
      <h2>{props.type}</h2>
      <div className="recipe-container">
        {childRecipes}
      </div>
    </div>
  );
};

export default RecipeContainer;
