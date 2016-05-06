import React, { Component } from 'react';
import { connect } from 'react-redux';
const filepicker = require('filepicker-js');

let filePick =  ( ) => {
  filepicker.setKey('AXQPXcRZOS2yRjJDsq39Hz');
  filepicker.pick(
    {
      mimetype: 'image/*',
      container: 'window',
    },
    function(data){
      console.log(JSON.stringify(data));
      let uploadURL = data.url;
    },
    function(error){
      console.log(error)
    }
  );
};

class ImageUpload extends Component {
  // constructor(props) {
  //   super(props);
  // }


  render() {
    return (
      <div>
      <button onclick={console.log('hi')}>Add Picsss</button>
      </div>
    );
  }
}


export default ImageUpload;
