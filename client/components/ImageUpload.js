import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { FILE_PICKER_KEY } from '../../server/keys/filePicker.js';
const filepicker = require('filepicker-js');


class ImageUpload extends Component {
  filePick() {
    filepicker.setKey(FILE_PICKER_KEY);
    filepicker.pick(
      {
        mimetype: 'image/*',
        container: 'window',
      },
      function(data){
        console.log(JSON.stringify(data));
        // uploadURL = data.url;
      },
      function(error){
        console.log(error);
      }
    );
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <button onClick={this.filePick}>Add Pics</button>
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
    uploadPicture: (imgURLs, add) => {
      const newSet = Object.assign({}, imgURLs);
      newSet.push(add);
      dispatch(actions.editRecipe());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
