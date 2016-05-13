import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../scss/_profile.scss';
import RecipeContainer from './RecipeContainer.js';
import { fetchUser } from '../utils/utils';
import actions from '../actions/index.js';

class Profile extends Component {

  componentDidMount() {
    const { updateProfile, id } = this.props;
    updateProfile(id);
  }

  componentWillUpdate(nextProps) {
    const currId = this.props.user.id;
    const { updateProfile, id } = nextProps;
    if (+currId !== +id) {
      updateProfile(id);
    }
  }

  render() {
    const { user, recipesOwned, recipesFollowed, recipesLiked } = this.props;
    // const avatarLarge = avatar.slice(0, user.avatar.length - 6); // slice off ?sz=50 from Google's avatar url
    return (
      <div className="profile-content">
        <div className="col-1-4">
          <img className="profile-avatar" src={user.avatar} alt="avatar"></img>
          <p className="profile-username">{user.display_name}</p>
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.profile.user,
    recipesOwned: state.profile.recipesOwned,
    recipesFollowed: state.profile.recipesFollowed,
    recipesLiked: state.profile.recipesLiked,
    id: ownProps.params.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (userID) => {
      fetchUser(userID, (profileUser) => {
        dispatch(actions.setProfileUser(profileUser));
      });
      // fetchRecipesOwned(userID), (recipesOwned) => {
      //   dispatch(action.SET_PROFILE_RECIPES_OWNED(recipesOwned));
      // });
      // fetchRecipesFollowed(userID), (recipesFollowed) => {
      //   dispatch(action.SET_PROFILE_RECIPES_FOLLOWED(recipesFollowed));
      // });
      // fetchRecipesLiked(userID), (recipesLiked) => {
      //   dispatch(action.SET_PROFILE_RECIPES_LIKED(recipesLiked));
      // });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
