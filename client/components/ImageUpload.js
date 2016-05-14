import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { FILE_PICKER_KEY } from '../../server/keys/filePicker.js';
const filepicker = require('filepicker-js');


class ImageUpload extends Component {
  render() {
    const { recipe, uploadPicture } = this.props;
    return (
      <div>
        <button onClick={() => uploadPicture(recipe)}>Add Pics</button>
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
      filepicker.setKey(FILE_PICKER_KEY);
      filepicker.pick(
        {
          mimetype: 'image/*',
          container: 'window',
        },
        (data) => {
          const newSet = { images: recipe.images };
          newSet.images.push(data.url);
          console.log(newSet);
          dispatch(actions.editRecipe(newSet));
        },
        (error) => console.log(error)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
