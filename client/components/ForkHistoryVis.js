import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import '../scss/_forkHistoryVis.scss';


class ForkHistoryVis extends Component {
  constructor() {
    super();
  }
  componentDidUpdate() {
    const { history, recipe } = this.props;
    console.log('props', this.props);
    console.log('mounted history', history);
    console.log('mounted recipe', recipe);
  }
  render() {
    const { history, recipe } = this.props;
    let recipeHistory = <p> no history </p>;
    if (history && history.length > 0) {
      recipeHistory = <div>
      {history.map(recipe => <div>
        <div className="history-vis-edge"> </div>
          <div className="history-vis-node" data-recipeInfo={recipe.title}>
            <div className="tooltiptext"> {recipe.title} <br /> {'Created: ' + recipe.created_at.slice(0, 10)}</div>
          </div>
        </div>)}
      </div>;
    }
    return (
      <div className="history-vis">
        <div className="history-vis-node" data-recipeInfo={recipe}>
          <span className="tooltiptext"> Current Recipe </span>
        </div>
        {recipeHistory}
      </div>
    );
  }
}
        // <button onClick={() => console.log(history)}> Get History </button>

export default ForkHistoryVis;
