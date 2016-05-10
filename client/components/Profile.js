import React from 'react';
import { connect } from 'react-redux';

import RecipeContainer from './RecipeContainer.js';

const Profile = (props) => (
  <div className="profile">
    <img className="profile-avatar" src={props.profile.avatar} alt="avatar"></img>
    <img className="profile-picture" src={props.user.photos[0].value} alt="avatar"></img>
    <p className="profile-username">{props.profile.username}</p>
    <p className="profile-displayname">{props.user.displayName}</p>
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
);

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    user: state.user,
    recipesOwned: state.recipesOwned,
    recipesFollowed: state.recipesFollowed,
  };
};

export default connect(mapStateToProps)(Profile);
