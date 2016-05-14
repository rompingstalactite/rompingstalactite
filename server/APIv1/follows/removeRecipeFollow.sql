DELETE FROM
  followers_users_recipes
WHERE
  user_id = ${user_id}
  AND recipe_id = ${recipe_id}
RETURNING *;
