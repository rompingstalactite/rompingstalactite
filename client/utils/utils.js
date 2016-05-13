import 'isomorphic-fetch';
let localServerURL;
try {
  localServerURL = location.origin; // dev or prod environment
} catch (e) {
  localServerURL = 'http://localhost:8080'; // no 'location' Travis/test environment
}

export const fetchRecipe = (recipeID, callback) => {
  let id = recipeID ? recipeID : 1;
  fetch(`${localServerURL}/api/v1/recipes/${id}`, {
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
  return fetch(`${localServerURL}/api/v1/likes/`, {
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
  return fetch(`${localServerURL}/api/v1/likes/?userID=${getLikeObj.userID}&recipeID=${getLikeObj.recipeID}`, {
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
  fetch(`${localServerURL}/api/v1/recipes/`, {
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

export const fetchCurrentUser = (callback) => {
  fetch(`${localServerURL}/api/v1/user/`, {
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

export const fetchUser = (userID, callback) => {
  fetch(`${localServerURL}/api/v1/users/${userID}`)
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((data) => {
    let userData;
    if (data.error) {
      userData = {
        'id': null,
        'username': 'username',
        'facebook_id': null,
        'google_id': null,
        'created_at': '',
        'updated_at': '',
        'display_name': 'First Last',
        'avatar': 'http://www.carderator.com/assets/avatar_placeholder_small.png',
        'email': 'email@example.com',
        'google_access_token': null,
        'active': true,
      };
    } else {
      userData = data;
    }
    callback(userData);
  })
  .catch((error) => {
    console.log('Error:', error);
    return;
  });
};

export const fetchRecipesLiked = (userID, callback) => {
  fetch(`${localServerURL}/api/v1/likes/${userID}`, {
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
    let likeData;
    if (data.error) {
      likeData = [];
    } else {
      likeData = data;
    }
    callback(likeData);
  })
  .catch((error) => {
    console.log('Error:', error);
    return;
  });
};

export const fetchRecipes = (recipeIDList, callback) => {
  const list = (!recipeIDList || recipeIDList.length === 0) ? [] : recipeIDList;
  const formattedQuery = JSON.stringify(list).replace('[','{').replace(']','}');
  fetch(`${localServerURL}/api/v1/recipes/?recipes=${formattedQuery}`, { //
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

export const searchRecipes = (query, callback) => {
  fetch(`${localServerURL}/api/v1/search/${query}`, {
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

export const fetchTrending = (callback) => {
  fetch(`${localServerURL}/api/v1/trending`, { //
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

export const fetchRecipesCreated = (userID, callback) => {
  fetch(`${localServerURL}/api/v1/created/${userID}`, {
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
    let createdData;
    if (data.error) {
      created = [];
    } else {
      createdData = data;
    }
    callback(createdData);
  })
  .catch((error) => {
    console.log('Error:', error);
    return;
  });
};
