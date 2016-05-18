INSERT INTO
  followers_users_recipes
    (user_id, recipe_id)
VALUES
  (${userID}, ${targetID})
ON CONFLICT
  (user_id, recipe_id)
DO NOTHING
RETURNING *;
