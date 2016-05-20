/**
* input
*   userID:     user_id<Number>
*   targetID:   recipe_id<Number>
*
* returns:
*   | followcount | togglefollow |
*   |-------------|--------------|
*   | number      | boolean      |
*/

WITH recipe_of_interest AS (
  SELECT
    user_id
  FROM
    followers_users_recipes
  WHERE
    recipe_id = ${targetID}
)
SELECT
  count(*) AS followcount,
  (EXISTS
    (SELECT
      1
    FROM
      recipe_of_interest
    WHERE
      user_id = ${userID})
  ) AS togglefollow
FROM
  recipe_of_interest;
