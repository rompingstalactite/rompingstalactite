import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index.js';
import { createRecipe } from '../utils/utils.js';
import $ from 'jquery';

export class CreateRecipe extends Component {
  constructor(props) {
    super(props);
  }
  // actions.editRecipe can accept an object whose prop name we modify in state
  // or just the name of a prop in state we want to add an empty entry to.
  updateRecipe(event, list) {
    let inputChange = {};
    // if a list is defined, we must modify an array position, not just reassign props.
    if (list) {
      const index = event.target.dataset.index;
      inputChange = list;
      inputChange[index] = event.target.value;
    } else {
      inputChange[event.target.name] = event.target.value;
    }
    return actions.editRecipe(inputChange);
  }
  addField(property) {
    // modify the recipe state to render a new field.
    return actions.addField(property);
  }


  render() {
    const { dispatch, recipe, } = this.props;
    return (
      <div>
        <div className="recipe-content">
          <form>
            # of spots in ingredients: {recipe.ingredients.length}
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            Images:
            <br />
            yield:
            <input
              type="text"
              name="yield"
              value={recipe.yield}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />
            yield_unit:
            <input
              type="text"
              name="yield_unit"
              value={recipe.yield_unit}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />


            <h1> Ingredients: </h1>
            <h3> {recipe.ingredients.map((i, key) => 
              <input 
              type="text" 
              value={i}
              data-index={key}
              onChange={(e) => dispatch(this.updateRecipe(e, recipe.ingredients))}>
              </input>)} 
            </h3>
            <button onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(this.addField('ingredients'));
            }}> add ingredient </button> <br />


            prep_time:
            <input
              type="text"
              name="prep_time"
              value={recipe.prep_time}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />

            <h1> Prep Steps: </h1>
            <h3> {recipe.prep_steps.map((i, key) => 
              <input 
              type="text" 
              value={i}
              data-index={key}
              onChange={(e) => dispatch(this.updateRecipe(e, recipe.prep_steps))}>
              </input>)} 
            </h3>
            <button onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(this.addField('prep_steps'));
            }}> add Step </button> <br />



            cook_time:
            <input
              type="text"
              name="cook_time"
              value={recipe.cook_steps}
              onChange={(e) => dispatch(this.updateRecipe(e))}
            /><br />

            <h1> Cook Steps: </h1>
            <h3> {recipe.cook_steps.map((i, key) => 
              <input 
              type="text" 
              value={i}
              data-index={key}
              onChange={(e) => dispatch(this.updateRecipe(e, recipe.cook_steps))}>
              </input>)} 
            </h3>
            <button onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(this.addField('cook_steps'));
            }}> add Step </button> <br />


            <h1> Finish Steps: </h1>
            <h3> {recipe.finish_steps.map((i, key) => 
              <input 
              type="text" 
              value={i}
              data-index={key}
              onChange={(e) => dispatch(this.updateRecipe(e, recipe.finish_steps))}>
              </input>)} 
            </h3>
            <button onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(this.addField('finish_steps'));
            }}> add Step </button> <br />

            <h1> Tags: </h1>
            <h3> {recipe.tags.map((i, key) => 
              <input 
              type="text" 
              value={i}
              data-index={key}
              onChange={(e) => dispatch(this.updateRecipe(e, recipe.tags))}>
              </input>)} 
            </h3>
            <button onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(this.addField('tags'));
            }}> add Step </button> <br />
            
            <button onClick={() => createRecipe(recipe, console.log)}> Submit </button>

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { recipe: state.recipe };
};

export default connect(mapStateToProps)(CreateRecipe);

// swap out the div on line 9 once state is added to redux store
// <div contentEditable={props.editable}>
// <div>
//   <p> {ingredient} </p>
//   <input
//     type="text"
//     name="ingredients"
//     key={i}
//     value={ingredient}
//     onChange={(e) => dispatch(this.addField(e))}
//   />
// </div>

// <h4> tags: {recipe.tags.map(t => <a> {t} </a>)} </h4>