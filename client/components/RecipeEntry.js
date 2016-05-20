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

  let author;
  if (props.recipe.display_name) {
    author = (<p className="recipe-entry-author" >Created by
      {' '}<Link to={`/profile/${props.recipe.author || 1}`}>
        {props.recipe.display_name}
      </Link>
    </p>);
  }

  const createdTime = moment(props.recipe.created_at).fromNow();
  return (
    <div className="recipe-entry-container">
      <div className="recipe-entry">
        <img className="recipe-entry-img" src={image} />
        <Link to={`/recipe/${props.recipe.recipe_id || props.recipe.id || 1}`}
        className="recipe-entry-title">
        {props.recipe.title}
        </Link>
        {author}
        <span className="date" >Created {createdTime}</span>
        <div>
          <p className="recipe-entry-description">{props.recipe.description || ''}</p>
        </div>
      </div>
    </div>
  );
};
export default RecipeEntry;
