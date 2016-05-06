import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
const filepicker = require('filepicker-js');


class ImageUpload extends Component {  
  filePick() {
    filepicker.setKey('File-Picker-API-Key');
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
  };

  render() {
    return (
      <div>
        <button onClick={this.filePick}>Add Pics</button>
      </div>
    );
  }
}


export default ImageUpload;
