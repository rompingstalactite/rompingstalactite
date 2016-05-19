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
  const createdTime = moment(props.recipe.created_at).fromNow();
  return (
    <div className="recipe-list-entry">
      <img src={image} />
      <Link to={`/recipe/${props.recipe.recipe_id || props.recipe.id || 1}`} className="recipe-entry-title">{props.recipe.title}</Link>
      <p className="recipe-author" >Created by {props.recipe.display_name}</p>
      <p className="recipe-create-date" >Created at {createdTime}</p>
    </div>
  );
};
export default RecipeListEntry;
