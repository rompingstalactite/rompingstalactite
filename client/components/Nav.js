import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { searchRecipes } from '../utils/utils.js';
import actions from '../actions/index.js';
import { push } from 'react-router-redux';
import { EMPTY_RECIPE } from '../constants/EmptyRecipe.js';
// import '../scss/_nav.scss';

class Nav extends Component {
  render() {
    const { user, avatar, search, recipeID, navToCreate, dispatch } = this.props;
    let { searchString } = this.props;
    let signInOut, linkToProfile;
    if (!user.id) {
      signInOut = <a className="navbar-link" href="/auth/google">Sign In</a>;
    } else {
      signInOut = <a className="navbar-link" href="/auth/signout">Sign Out</a>;
      linkToProfile = (
        <Link to={`/profile/${user.id}`} style={{paddingTop: 0, paddingBottom: 0}}>
          <img className="avatar" src={avatar} alt="avatar"></img>
        </Link>);
    }
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#abc" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="19px" x="0px" y="0px" viewBox="0 0 898 128" overflow="visible">
                  <defs></defs>
                  <path fill="#FFFFFF" d="M32.4,8.2c-2.6,0.3-4.8,1.4-6.5,3.4c-2.7,3.1-4.3,8-4.3,15.2v27.8h18.6v7.9H21.7v56h14v7.9H1v-7.9h12v-56H0 v-7.9h13V29.5c0-10.9,1.9-18.4,6.8-23.4C23.6,2.4,28,0,34.7,0c7,0,12,3.1,12,8.5c0,3.9-2.7,6.7-6.3,6.7C36,15.2,33.5,12.3,32.4,8.2z"/>
                  <path fill="#FFFFFF" d="M50.9,90.5c0-20.7,14.7-37.2,36.4-37.2c21.7,0,36.4,16.6,36.4,37.2s-14.7,37.2-36.4,37.2 C65.6,127.7,50.9,111.2,50.9,90.5z M114.4,90.5c0-17.1-11.1-29.4-27.1-29.4c-16,0-27.1,12.3-27.1,29.4c0,17.2,11.1,29.4,27.1,29.4 C103.3,119.9,114.4,107.7,114.4,90.5z"/>
                  <path fill="#FFFFFF" d="M190.9,61.5c0,3.9-3.1,7.3-7,7.3c-3.8,0-6.7-2.7-7.7-5.8c-5.6,1.5-12.3,8.4-16,15.9v39.6h14v7.9h-34.7v-7.9 h12v-56h-12v-7.9h20.3v16.2c5.1-9.9,14.3-17.6,21.3-17.6C187.5,53.3,190.9,57.2,190.9,61.5z"/>
                  <path fill="#FFFFFF" d="M198.1,118.5h12V9.2h-12V1.4h20.7v90.5l34.2-29.7H237v-7.5h39.8v7.9h-12.5l-25.4,21.9l24.1,34.1h13.8v7.9 h-18.6L232.6,89l-13.8,11.8v17.8h12.8v7.9h-33.5V118.5z"/>
                  <path fill="#FFFFFF" d="M319.3,8.2c-2.6,0.3-4.8,1.4-6.5,3.4c-2.7,3.1-4.3,8-4.3,15.2v27.8h18.6v7.9h-18.6v56h14v7.9h-34.7v-7.9h12 v-56h-13v-7.9h13V29.5c0-10.9,1.9-18.4,6.8-23.4c3.8-3.8,8.2-6.1,14.9-6.1c7,0,12,3.1,12,8.5c0,3.9-2.7,6.7-6.3,6.7 C322.9,15.2,320.3,12.3,319.3,8.2z"/>
                  <path fill="#FFFFFF" d="M352.4,118.2c-2.2-4.1-3.2-9-3.2-14.9V62.5h-12v-7.9h20.7v47.5c0,4.4,0.9,8,2.2,10.8 c2.4,4.6,6.7,6.7,13.1,6.7c10.2,0,18.8-6.8,26-14.7V62.5h-12v-7.9h20.7v63.9h12v7.9h-20.3v-14.2c-6.7,8.5-17.6,15.5-27.7,15.5 C362,127.7,355.8,124.1,352.4,118.2z"/>
                  <path fill="#FFFFFF" d="M431.6,118.5h12.6V9.2h-12.6V1.4H453v117.1h12.8v7.9h-34.2V118.5z"/>
                  <path fill="#FFFFFF" d="M787.1,80.7c-0.7,1.7-0.8,3.3-0.1,5c0.7,1.7,1.8,2.9,3.4,3.6c1.6,0.8,3.3,0.9,5.1,0.3 c1.7-0.7,2.9-1.8,3.6-3.4l32.5-70.7c0.7-1.7,0.7-3.4,0.2-5.1c-0.6-1.6-1.8-2.8-3.4-3.6c-1.7-0.7-3.3-0.8-5-0.2 c-1.7,0.6-2.9,1.7-3.7,3.4L787.1,80.7z"/>
                  <path fill="#FFFFFF" d="M746.1,78.5l21.9,1.8c-0.5,1.5-0.4,3.1,0.1,4.6c0.6,1.7,1.7,2.9,3.3,3.7c1.6,0.8,3.3,0.9,5.1,0.3 c1.7-0.7,2.9-1.9,3.7-3.5l32.5-70.7c0.7-1.7,0.7-3.4,0.1-5c-0.6-1.6-1.8-2.9-3.4-3.7c-1.7-0.7-3.4-0.7-5.1-0.1 c-1.7,0.6-2.9,1.7-3.7,3.3l-1.1,2.6l-54.5,0c-19.1,2.2-25.1,10-28.9,21L544.7,30c-0.1,0.1-0.2,0.2-0.3,0.3c-4.4-0.4-6.4,0.5-9.6,3.9 c-3.6,3.8-5.9,10-2,17.3c0,0,5.5,6,10.5,5.9c0,0,0.1,0,0.1,0.1l170.6,0.6C719.6,69.8,738.9,77.2,746.1,78.5z M771.8,72.1l-10.1-0.2 c-1.8-0.1-3.3,0-4.5-1.3c-1.3-1.3-1.9-2.1-1.8-4c0-1.8,0.7-3.3,2.1-4.6c1.2-1.3,2.7-1.9,4.6-1.8l15.7,0.4L771.8,72.1z M787.2,39.5 l-5.9,13L762.2,52c-1.8,0-3.3-0.7-4.5-2c-1.3-1.4-1.9-2.9-1.9-4.7c0.1-1.8,0.8-3.3,2.1-4.6c1.2-1.3,2.8-1.9,4.6-1.9L787.2,39.5z  M763.2,17.7l33.7,0.1l-5.9,13.7l-28.2-0.7c-1.8,0-3.3-0.7-4.5-2c-1.2-1.3-1.8-2.8-1.8-4.7c0-1.8,0.7-3.4,2-4.6 C759.8,18.2,761.3,17.6,763.2,17.7z"/>
                  <path fill="#FFFFFF" d="M780.9,112.9c35.1-13.1,64.5,17.8,74.5-12.3c2-6.1-7.4-17.7-7.4-17.7l9.6,0.2l0.3-8.3L823.9,74l5.9-11.6 l28.4,0.7l0.2-8.2l-24.9-0.6l5.8-12.9l19.4,0.4l0.2-8.2L843,33.3l5.9-13.7l10.4,0.2l0.1-6.2l-8.2-0.1c0-0.9-0.2-1.7-0.5-2.5 c-0.7-1.6-1.8-2.8-3.4-3.6c-1.7-0.7-3.3-0.8-5-0.1c-1.7,0.6-2.9,1.8-3.7,3.4l-32.3,70.7c-0.8,1.7-0.8,3.4-0.2,5 c0.6,1.7,1.8,2.9,3.3,3.7c1.6,0.7,3.3,0.8,5,0.2c1.7-0.7,2.9-1.9,3.7-3.5l2.1-4.6l12.8,0.4c0.2,1,0.6,1.9,1.2,2.8 c35.1,36.1-38.2,6.4-54.8,16.6c0,0-12,4.7-16.3,5.8c-12.7,3.2-25.7-2.1-37.8-7.7C713.7,94.5,702,89,690.2,83.4 c-8-3.8-16.6-6.4-25.7-7.8c-0.2,0-0.4-0.1-0.6-0.1c-3.7-0.2-7.4-0.3-11-0.2c-11.5,0.4-22.8,2.5-33.9,6.3 c-12.8,4.4-25.8,8.2-39.1,11.3l-0.1,0C567,96,554.7,94.6,543,88.7c-0.1,0-0.1,0-0.2,0.1c-2.2-0.8-4.7-0.4-6.6,1.2 c-2.8,2.4-3.2,6.6-0.8,9.5c0.7,0.8,1.5,1.4,2.4,1.8c14.4,7,29.4,8.6,45.3,4.8c13.6-3.1,27.1-7,40.4-11.6c7.6-2.6,15.3-4.3,23.2-5.1 c5.3-0.5,10.8-0.6,16.2-0.3c7.6,1.2,14.7,3.4,21.5,6.6c11.7,5.6,23.4,11.1,35.2,16.5l-0.1,0c14.2,6.6,29.6,13.1,44.3,9 C770.4,119.3,774.4,115.3,780.9,112.9z"/>
                </svg>
              </Link>
            </div>

            <div className="navbar-collapse collapse" id="abc">
              {/*<form className="navbar-form navbar-left" style={{maxWidth: '300px'}}>*/}
                <div className="navbar-form navbar-left form-group" style={{maxWidth: '300px'}}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for recipes"
                    onKeyDown={(e) => { e.keyCode === 13 ? search(searchString) : searchString = e.target.value }}
                  ></input>
                  {/*<input
                    type="submit"
                    className="btn btn-default"
                    onKeyDown={(e) => { e.keyCode === 13 ? search(searchString) : searchString = e.target.value }}
                  ></input>*/}
                </div>
              {/*</form>*/}

              <ul className="nav navbar-nav navbar-right">
                <li><a className="navbar-link" href="/dashboard">Discover</a></li>
                <li><a className="navbar-link" href="/create" onClick={() => navToCreate()}>Create</a></li>
                <li>{signInOut}</li>
                <li>{linkToProfile}</li>
              </ul>
            </div>

          </div>
        </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    avatar: state.user.photos[0].value,
    recipeID: state.recipe.id,
    // map a local variable to props
    searchString: '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => {
      searchRecipes(query, (recipeArray) => {
        dispatch(actions.setRecipeList(recipeArray));
        dispatch(push('/search'));
      });
    },
    navToCreate: () => {
      dispatch(actions.setRecipe(EMPTY_RECIPE));
      dispatch(push('/create'));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
