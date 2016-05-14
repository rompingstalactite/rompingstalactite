import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import '../scss/_recipeEntry.scss';

import Fork from './Fork';
import Like from './Like';

moment().format();

const RecipeEntry = (props) => {
  let image;
  if (props.recipe.image) {
    image = props.recipe.image;
  } else if (props.recipe.images) {
    image = props.recipe.images[0];
  } else {
    image = null;
  }
  const createdTime = moment(props.recipe.created_at).fromNow();
  return (
    <div className="recipe-entry-container">
      <div className="recipe-entry">
        <img className="recipe-entry-img" src={image} />
        <span className="date" >Created {createdTime}</span>
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
            <Fork recipe={props.recipe.recipe_id || props.recipe.id} />
            <Like recipe={props.recipe.recipe_id || props.recipe.id} />
            <button disabled>Edit</button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default RecipeEntry;
