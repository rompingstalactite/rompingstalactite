import 'isomorphic-fetch';

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

export const updateLike = (likeObj) => {
  return fetch('http://localhost:8080/api/v1/likes/', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeObj),
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
};

export const getLikeState = (getLikeObj) => {
  return fetch(`http://localhost:8080/api/v1/likes/?userID=${getLikeObj.userID}&recipeID=${getLikeObj.recipeID}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
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

  recipeCopy.fork_history = recipe.fork_history || [];
  recipeCopy.fork_history.push(recipe.id);

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
    credentials: 'same-origin',
    body: JSON.stringify(recipe),
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

export const forkRecipe = (originalRecipeID, userID, callback) => {
  fetchRecipe(originalRecipeID, (recipe) => {
    createRecipe(bindAuthorToNewRecipe(userID)(recipe), callback);
  });
};

export const fetchUser = (callback) => {
  fetch('http://localhost:8080/api/v1/user/', {
    credentials: 'same-origin',
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

export const fetchRecipes = (recipeIDList, callback) => {
  const formattedQuery = JSON.stringify(recipeIDList).replace('[','{').replace(']','}');
  fetch(`http://localhost:8080/api/v1/recipes/?recipes=${formattedQuery}`, {
    credentials: 'same-origin',
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
}

// export const forkRecipe = (originalRecipeID, userID, callback) => {
//   fetch('/api/v1/recipes/fork', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       user_id: userID,
//       recipe_id: originalRecipeID,
//     }),
//   })
//   .then(response => {
//     return response.json();
//   })
//   .then(response => {
//     return fetchRecipe(response[0].id, function(response) {
//       callback(response);
//     });
//   });
// };
