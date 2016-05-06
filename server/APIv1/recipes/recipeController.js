import { postgresConnection as cn } from '../../config/helpers.js';
const pgp = require('pg-promise')();
const db = pgp(cn);

module.exports = {
  getOneRecipe: (request, response, next) => {
    const newQueryObj = {
      name: 'get-one-recipe',
      text: `SELECT
               1
             FROM
               recipes
             WHERE
               id = $1`,
      values: [request.params.id],
    };

    db.one(newQueryObj)
      .then((data) => {
        response.json(data);
        next();
      }).catch((error) => {
        response.json(error);
        next();
      });
  },
  getMultipleRecipes: (request, response, next) => {
    const newQueryObj = {
      name: 'get-multiple-recipes',
      text: `SELECT *
                 FROM
                   recipes
                 WHERE
                   id = ANY($1)`,
      values: [request.body._queryResultIds],
    };

    db.query(newQueryObj).then((data) => {
      response.json(data);
      next();
    }).catch((error) => {
      response.json(error);
      next();
    });
  },
  addRecipeImage: (request, response, next) => {
    const newQueryObj = {
      name: 'add-recipe-image',
      text: `UPDATE recipes 
              SET 
                images = array_append(images, $1) 
              WHERE
                id = $2`,
      values: [request.body.newURL, request.body.id],
    };

    const newQueryObj2 = {
      name: 'find-new-recipe-image',
      text: `SELECT images
              FROM recipes 
                WHERE $1 = ANY(images)
                AND id = $2`,
      values: [request.body.newURL, request.body.id],
    };
    db.query(newQueryObj);
    db.query(newQueryObj2)
      .then((data) => {

        response.status(201);
        response.json(data);
        next();
       }).catch((error) => {
        response.json(error);
        next();
    });
  },

  removeRecipeImage: (request, response, next) => {
    const newQueryObj = {
      name: 'remove-recipe-image',
      text: `UPDATE recipes 
              SET
                images = array_remove(images, $1) 
              WHERE
                id = $2`,
      values: [request.body.newURL, request.body.id],
    };

    const newQueryObj2 = {
      name: 'find-new-recipe-image',
      text: `SELECT images
              FROM recipes 
                WHERE $1 = ANY(images)
                AND id = $2`,
      values: [request.body.newURL, request.body.id],
    };

    db.query(newQueryObj);
    db.query(newQueryObj2).then((data) => {
      response.json(data);
      next();
    }).catch((error) => {
      response.json(error);
      next();
    });
  },
};
