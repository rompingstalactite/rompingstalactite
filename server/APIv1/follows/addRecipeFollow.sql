INSERT INTO
  followers_users_recipes
    (user_id, recipe_id)
VALUES
  (${user_id}, ${recipe_id})
ON CONFLICT
  (user_id, recipe_id)
DO NOTHING
RETURNING *;
