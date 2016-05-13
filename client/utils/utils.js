import 'isomorphic-fetch';
const dbURL = 'postgres://jzjrxbgiddtony:LCWyxG1KnBQCnPsGSLi9OsQuSx@ec2-107-20-174-127.compute-1.amazonaws.com:5432/d3cfpv8im8tih' || 'http://localhost:8080';

export const fetchRecipe = (recipeID, callback) => {
  fetch(`${dbURL}/api/v1/recipes/${recipeID}`, {
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
  return fetch(`${dbURL}/api/v1/likes/`, {
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
  return fetch(`${dbURL}/api/v1/likes/?userID=${getLikeObj.userID}&recipeID=${getLikeObj.recipeID}`, {
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
  fetch(`${dbURL}/api/v1/recipes/`, {
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
  fetch(`${dbURL}/api/v1/user/`, {
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
  fetch(`${dbURL}/api/v1/recipes/?recipes=${formattedQuery}`, {
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
  console.log(process.env.DATABASE_URL);
  console.log(`${dbURL}/api/v1/search/${query}`);
  fetch(`${dbURL}/api/v1/search/${query}`, {
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
  console.log(`${dbURL}/api/v1/recipes/trending`);
  fetch(`${dbURL}/api/v1/recipes/trending`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
