import React from 'react';
import { Link } from 'react-router';
import '../scss/_recipeEntry.scss';

const RecipeEntry = (props) => {
  let image;
  if (props.recipe.image) {
    image = props.recipe.image;
  } else if (props.recipe.images) {
    image = props.recipe.images[0];
  } else {
    image = null;
  }
  return (
    <div className="recipe-entry">
      <img className="recipe-image" src={image} />
      <Link to={`/recipe/${props.recipe.id || 1}`} className="recipe-title">{props.recipe.title}</Link>
      <p className="recipe-create-date" >Created at {props.recipe.created_at}</p>
    </div>
  );
};
export default RecipeEntry;
