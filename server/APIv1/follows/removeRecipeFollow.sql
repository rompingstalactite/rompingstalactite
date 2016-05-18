DELETE FROM
  followers_users_recipes
WHERE
  user_id = ${userID}
  AND recipe_id = ${targetID}
RETURNING *;
