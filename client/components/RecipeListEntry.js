import React from 'react';
import { Link } from 'react-router';

const RecipeListEntry = (props) => {
  return (
    <div className="recipe-list-entry">
      <Link to={`/recipe/${props.recipe.recipe_id || props.recipe.id || 1}`} className="recipe-title">{props.recipe.title}</Link>
      <p className="recipe-create-date" >Created at {props.recipe.created_at}</p>
    </div>
  );
};
export default RecipeListEntry;
