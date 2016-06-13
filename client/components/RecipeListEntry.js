import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import '../scss/_recipeListEntry.scss';


moment().format();

const RecipeListEntry = (props) => {
  let image;
  if (props.recipe.image) {
    image = props.recipe.image;
  } else if (props.recipe.images) {
    image = props.recipe.images[0];
  } else {
    image = null;
  }
  let title;
  if (props.recipe.title) {
    title = props.recipe.title;
    if (props.recipe.title.length > 20) {
      title = props.recipe.title.slice(0, 19).concat('...');
    }
  }

  const createdTime = moment(props.recipe.created_at).fromNow();
  return (
    <div className="recipe-list-entry media">
      <div className="media-left">
        <img src={image} />
      </div>
      <div className="media-body">
        <Link to={`/recipe/${props.recipe.recipe_id || props.recipe.id || 1}`}
          className="recipe-entry-title">{title}
        </Link>
        <p className="recipe-author" >Created by {props.recipe.display_name} <span className="text-muted">{createdTime}</span></p>
      </div>
    </div>
  );
};
export default RecipeListEntry;
