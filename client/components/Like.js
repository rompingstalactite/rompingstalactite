import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import classNames from 'classnames';
import { getLikeState, updateLike } from '../utils/utils';


class Like extends Component {
  constructor(props) {
    super(props);
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Like);
