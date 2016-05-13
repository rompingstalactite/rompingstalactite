import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../scss/_profile.scss';
import RecipeContainer from './RecipeContainer.js';

class Profile extends Component {

  componentDidMount() {

  }

  componentWillUpdate(nextProps) {

  }

  render() {
    const { avatar, user, recipesOwned, recipesFollowed, recipesLiked } = this.props;
    return (
      <div className="profile-content">
        <div className="col-1-4">
          <img className="profile-avatar" src={avatar/*props.avatar.slice(0, props.avatar.length-6)*/} alt="avatar"></img>
          <p className="profile-username">{user.displayName}</p>
        </div>
        <div className="profile-recipe-containers col-3-4">
          <RecipeContainer
            className="recipes-owned"
            type="My Recipes"
            recipes={recipesOwned}
          />
            <RecipeContainer
            className="recipes-followed"
            type="Followed Recipes"
            recipes={recipesFollowed}
          />
          <RecipeContainer
            className="recipes-liked"
            type="Liked Recipes"
            recipes={recipesLiked}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    avatar: state.user.photos[0].value,
    recipesOwned: state.recipesOwned,
    recipesFollowed: state.recipesFollowed,
    recipesLiked: state.recipesLiked,
  };
};

export default connect(mapStateToProps)(Profile);
