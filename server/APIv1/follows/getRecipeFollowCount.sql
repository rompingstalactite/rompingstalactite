SELECT
  COUNT(*)
FROM
  followers_users_recipes
WHERE
  recipe_id = ${recipe_id};
