import React from 'react';
import { connect } from 'react-redux';
import '../scss/_profile.scss';
import RecipeContainer from './RecipeContainer.js';

const Profile = (props) => (
  <div className="profile-content">
    <div className="col-1-4">
      <img className="profile-avatar" src={props.avatar.slice(0, props.avatar.length-6)} alt="avatar"></img>
      <p className="profile-username">{props.user.displayName}</p>
    </div>
    <div className="profile-recipe-containers col-3-4">
      <RecipeContainer
        className="recipes-owned"
        type="My Owned Recipes"
        recipes={props.recipesOwned}
      />
      <RecipeContainer
        className="recipes-followed"
        type="My Followed Recipes"
        recipes={props.recipesFollowed}
      />
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    user: state.user,
    avatar: state.user.photos[0].value,
    recipesOwned: state.recipesOwned,
    recipesFollowed: state.recipesFollowed,
  };
};

export default connect(mapStateToProps)(Profile);
