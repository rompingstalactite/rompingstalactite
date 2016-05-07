require('isomorphic-fetch');

export const fetchRecipe = (recipeID, callback) => {
  fetch(`http://localhost:8080/api/v1/recipes/${recipeID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((data) => {
    callback(data);
  })
  .catch((error) => {
    console.log('Error:', error);
    return;
  });
};

const assignAuthorToNewRecipe = (author, recipe) => {
  const recipeCopy = {};
  Object.keys(recipe).forEach((k) => {
    if (k !== 'id' && k !== 'created_at' && k !== 'updated_at') {
      recipeCopy[k] = recipe[k];
    }
  });
  recipeCopy.parent = recipe.id;
  recipeCopy.author = author;
  return recipeCopy;
};

const bindAuthorToNewRecipe = (author) => assignAuthorToNewRecipe.bind(null, author);

export const createRecipe = (recipe, callback) => {
  fetch('http://localhost:8080/api/v1/recipes/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })
  .then((response) => {
    if (response.status >= 400) {
      callback(new Error('Bad response from server'));
    }
    return response.json();
  })
  .then((data) => {
    callback(data);
  })
  .catch((error) => {
    console.log('Error:', error);
    return;
  });
};

export const forkRecipe = (originalRecipeID, userID, callback) => {
  fetchRecipe(originalRecipeID, (recipe) => {
    createRecipe(bindAuthorToNewRecipe(userID)(recipe), callback);
  });
};

// forkRecipe(1, 432, console.log);

// FORKS

// fetch current recipe
// modify author and parent fields
// grab rest of recipe data
// create a new recipe in the database with data
// forkRecipe(13, 789, console.log);


// TODO
// update recipe state to new recipe
// redirect to new recipe page
