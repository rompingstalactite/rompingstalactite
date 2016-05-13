SELECT
  COUNT(*)
FROM
  follows_users_recipes
WHERE
  recipe_id = ${recipe_id};
