import React from 'react';
import { Link } from 'react-router';
import '../scss/_recipeEntry.scss';

const RecipeEntry = (props) => (
  <div className="recipe-entry">
    <img className="recipe-image" src={props.recipe.image} />
    <Link to={`/recipe/${props.recipe.id}`} className="recipe-title">{props.recipe.title}</Link>
    <p className="recipe-create-date" >Created at {props.recipe.created_at}</p>
  </div>
);

export default RecipeEntry;
