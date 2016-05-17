import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { fetchFPKey } from '../utils/utils';
import '../scss/_forkHistoryVis.scss';


const ForkHistoryVis = () => {
  // const { history } = this.props;
  return (
    <div className="history-vis">
      <div className="history-vis-node"> </div>
      <div className="history-vis-edge"> </div>
      <div className="history-vis-node"> </div>
      <div className="history-vis-edge"> </div>
      <div className="history-vis-node"> </div>
      <div className="history-vis-edge"> </div>
      <div className="history-vis-node"> </div>
    </div>
  );
};

export default ForkHistoryVis;
