require('es6-promise').polyfill();
require('isomorphic-fetch');

var fetchRecipe = function(recipe, callback) {
  fetch('http://localhost:8080/api/v1/recipes/' + recipe)
  .then(function(response) {
    if (response.status >= 400) {
      callback(new Error('Bad response from server'));
    }
    callback(null, response);
  });
};

var getRecipeData = function(error, response, parent, author) {
  if (error) {
    throw error;
  }
  var newRecipe = Object.assign({}, response);
  newRecipe.parent = parent;
  newRecipe.author = author;
  return newRecipe;
};


var createRecipe = function(recipe, callback) {
  fetch('http://localhost:8080/api/v1/recipes/', {
    method: 'POST',
    body: JSON.stringify(recipe)
  })
  .then(function(response) {
    if (response.status >= 400) {
      callback(new Error('Bad response from server'));
    }
    callback(null, response);
  });
};



// FORKS

// fetch current recipe

// modify author and parent fields
// grab rest of recipe data
// create a new recipe in the database with data

// createRecipe
// update recipe state to new recipe
// redirect to new recipe page
