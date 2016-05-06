require('isomorphic-fetch');

var fetchRecipe = function(recipe, callback) {
  fetch('http://localhost:8080/api/v1/recipes/' + recipe, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then(function(data) {
    callback(data);
  })
  .catch(function(error) {
    console.log('Error:', error);
    return;
  });
};

var bindAuthorToNewRecipe = function(author) {
  return assignAuthorToNewRecipe.bind(null, author);
};

var assignAuthorToNewRecipe = function(author, recipe) {
  var recipeCopy = {};
  for (var k in recipe) {
    if (k !== 'id' && k !== 'created_at' && k !== 'updated_at') {
      recipeCopy[k] = recipe[k];
    }
  }
  recipeCopy.parent = recipe.id;
  recipeCopy.author = author;
  return recipeCopy;
};

var createRecipe = function(recipe, callback) {
  fetch('http://localhost:8080/api/v1/recipes/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  })
  .then(function(response) {
    if (response.status >= 400) {
      callback(new Error('Bad response from server'));
    }
    return response.json();
  })
  .then(function(data) {
    callback(data);
  })
  .catch(function(error) {
    console.log('Error:', error);
    return;
  });
};

var forkRecipe = function(originalRecipeId, userId, callback) {
  fetchRecipe(originalRecipeId, function(recipe) {
    createRecipe(bindAuthorToNewRecipe(userId)(recipe), callback);
  });
};


// FORKS

// fetch current recipe
// modify author and parent fields
// grab rest of recipe data
// create a new recipe in the database with data
// forkRecipe(13, 789, console.log);


// TODO
// update recipe state to new recipe
// redirect to new recipe page
