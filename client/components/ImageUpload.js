import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { fetchFPKey } from '../utils/utils';
const filepicker = require('filepicker-js');
import '../scss/_createRecipe.scss';

class ImageUpload extends Component {
  render() {
    const { recipe, uploadPicture } = this.props;
    return (
      <div>
        <button
        className="btn btn-add"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          uploadPicture(recipe);
        }}>Add Pics</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPicture: (recipe) => {
      fetchFPKey((key) => {
        filepicker.setKey(key);
        filepicker.pick(
          {
            mimetype: 'image/*',
            container: 'window',
          },
          (data) => {
            const newSet = { images: recipe.images };
            newSet.images.push(data.url);
            dispatch(actions.editRecipe(newSet));
          },
          (error) => console.log(error)
        );
      });

    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
