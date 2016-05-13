/**
* input
*   follower: user_id<Number>
*   target:   recipe_id<Number>
*
* returns:
* | followcount | togglefollow |
* |-------------|--------------|
* | number      | boolean      |
*/

WITH recipe_of_interest AS (
  SELECT
    user_id
  FROM
    followers_users_recipes
  WHERE
    recipe_id = ${recipe_id}
)
SELECT
  count(*) AS followCount,
  (EXISTS
    (SELECT
      1
    FROM
      recipe_of_interest
    WHERE
      user_id = ${user_id})
  ) AS toggleFollow
FROM
  recipe_of_interest;
