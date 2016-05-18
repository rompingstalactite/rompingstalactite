import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { fetchFPKey } from '../utils/utils';
import '../scss/_forkHistoryVis.scss';


const ForkHistoryVis = (props) => {
  const history = props.history;
  const recipe = props.recipe;
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
