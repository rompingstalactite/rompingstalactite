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
    <div className="recipe-entry-container">
      <div className="recipe-entry">
        <img className="recipe-entry-img" src={image} />
        <span className="date">Created: {props.recipe.created_at} </span>
        <div>
          <Link to={`/recipe/${props.recipe.recipe_id || props.recipe.id || 1}`}
          className="recipe-entry-title">
          {props.recipe.title}
          </Link>
          <p className="recipe-entry-description">... some description to come</p>

          <div className="action-buttons">
            <span>♥</span>
            <span>⤿</span>
            <span>⑂</span>
            <span>⟲</span>
          </div>

        </div>
      </div>
    </div>
  );
};
export default RecipeEntry;
