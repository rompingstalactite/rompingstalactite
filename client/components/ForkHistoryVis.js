import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { push } from 'react-router-redux';
import '../scss/_forkHistoryVis.scss';


class ForkHistoryVis extends Component {
  constructor() {
    super();
  }
  componentDidUpdate() {
    const { history, recipe } = this.props;
  }
  render() {
    const { history, recipe, navToHistRecipe } = this.props;
    let recipeHistory = <p> no history </p>;
    if (history && history.length > 0) {
      recipeHistory = <div>
      {history.map(histRecipe => {
        let creationDate = 'no date specified';
        if (histRecipe.created_at) {
          creationDate = 'Created: ' + histRecipe.created_at.slice(0, 10);
        }
        return (<div>
        <div className="history-vis-edge"> </div>
          <div className="history-vis-node" onClick={() => navToHistRecipe(histRecipe.id)} data-recipeInfo={histRecipe.title}>
            <div className="tooltiptext"> {histRecipe.title} <br /> {creationDate}</div>
          </div>
        </div>
        )}
      )}
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

const mapDispatchToProps = (dispatch) => ({
  navToHistRecipe: (recipeID) => {
    dispatch(push(`/recipe/${recipeID}`));
  },
});

export default connect(null, mapDispatchToProps)(ForkHistoryVis);
