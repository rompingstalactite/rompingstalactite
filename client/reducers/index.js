import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  
  updateRecipe: function(recipe) {
    return { type: 'UPDATE_Recipe', recipe };
  },

});

export default rootReducer;
